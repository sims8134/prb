// Shared anti-bot helpers for /api/newsletter and /api/contact.
// No external service, no dependency.

/** Minimum time (ms) between page load and form submission for a human. */
export const MIN_FILL_TIME_MS = 3000;

/**
 * True when the submission looks automated:
 * - the hidden honeypot field "website" was filled in, or
 * - the form was submitted less than 3 s after page load, or
 * - the "elapsed_ms" field (set by the page script at submit time) is missing,
 *   which happens when a bot posts directly to the API without running the page.
 */
export function isBotSubmission(formData: FormData): boolean {
  const honeypot = String(formData.get("website") || "").trim();
  if (honeypot) return true;

  const elapsed = Number(formData.get("elapsed_ms"));
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_TIME_MS) return true;

  return false;
}

/**
 * Client IP as seen by Vercel. Vercel sets these headers itself at its edge,
 * so they cannot be forged by the client.
 */
export function getClientIp(request: Request, clientAddress?: () => string): string {
  const headers = request.headers;
  const forwarded =
    headers.get("x-vercel-forwarded-for") ||
    headers.get("x-forwarded-for") ||
    headers.get("x-real-ip");

  if (forwarded) return forwarded.split(",")[0].trim();

  try {
    return clientAddress?.() || "unknown";
  } catch {
    return "unknown";
  }
}

// ---------------------------------------------------------------------------
// Rate limiting (best effort)
//
// Counters live in the memory of the serverless function instance. On Vercel,
// an instance is reused between requests while it stays warm, but several
// instances can run in parallel and memory is lost on a cold start. This limit
// therefore slows down a bot hammering the form from one IP, but it is NOT a
// strict guarantee. A strict limit requires shared storage (Redis/KV), which is
// an external service.
// ---------------------------------------------------------------------------

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

/** Records an attempt and returns true if the limit (3 per hour) is exceeded. */
export function isRateLimited(bucket: string, ip: string): boolean {
  const now = Date.now();
  const key = `${bucket}:${ip}`;

  const recent = (hits.get(key) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded: drop expired entries when the map grows too large.
  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}

// ---------------------------------------------------------------------------
// Email validation
// ---------------------------------------------------------------------------

const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i;

export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;

  const at = email.lastIndexOf("@");
  if (at < 1) return false;

  const local = email.slice(0, at);
  if (local.length > 64) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;

  return EMAIL_PATTERN.test(email);
}

// Most common disposable / temporary email providers.
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "10minutemail.net",
  "20minutemail.com",
  "33mail.com",
  "dispostable.com",
  "discard.email",
  "emailondeck.com",
  "fakeinbox.com",
  "getairmail.com",
  "getnada.com",
  "guerrillamail.biz",
  "guerrillamail.com",
  "guerrillamail.de",
  "guerrillamail.info",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamailblock.com",
  "grr.la",
  "harakirimail.com",
  "inboxkitten.com",
  "jetable.org",
  "mail-temp.com",
  "mailcatch.com",
  "maildrop.cc",
  "mailinator.com",
  "mailinator.net",
  "mailnesia.com",
  "mailpoof.com",
  "mintemail.com",
  "mohmal.com",
  "moakt.com",
  "mytemp.email",
  "nada.email",
  "sharklasers.com",
  "spam4.me",
  "spamgourmet.com",
  "temp-mail.io",
  "temp-mail.org",
  "tempail.com",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "tempr.email",
  "throwawaymail.com",
  "tmail.ws",
  "tmpmail.net",
  "tmpmail.org",
  "trashmail.com",
  "trashmail.de",
  "trashmail.net",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  if (DISPOSABLE_DOMAINS.has(domain)) return true;

  // Also catch subdomains (e.g. "x.mailinator.com").
  for (const d of DISPOSABLE_DOMAINS) {
    if (domain.endsWith(`.${d}`)) return true;
  }
  return false;
}
