import type { APIRoute } from "astro";
import { Resend } from "resend";
import crypto from "node:crypto";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const SECRET = import.meta.env.NEWSLETTER_CONFIRM_SECRET;

function verifyToken(token: string) {
  const decoded = Buffer.from(token, "base64url").toString("utf8");
  const parts = decoded.split("|");

  if (parts.length !== 3) {
    throw new Error("Invalid token.");
  }

  const [email, expires, signature] = parts;
  const payload = `${email}|${expires}`;

  const expectedSignature = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");

  if (signature !== expectedSignature) {
    throw new Error("Invalid signature.");
  }

  if (Date.now() > Number(expires)) {
    throw new Error("Token expired.");
  }

  return email;
}

const SUBSCRIBE_URL = "https://www.youtube.com/channel/UCoqg7QUUHZJUG-r3oH1B1Sg?sub_confirmation=1";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Step 1, the link in the email: only shows a button. Link scanners (Outlook Safe
// Links, antivirus, corporate gateways) open every link, so a GET must not subscribe.
export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get("token") || "";
  try {
    verifyToken(token);
  } catch {
    return failurePage("This confirmation link is invalid or has expired (links last 24 hours).", 400);
  }

  return statusPage(
    "One tap to go",
    "Confirm that you want the PRB newsletter, and you're on the list.",
    200,
    `<form method="POST" action="/api/newsletter/confirm">
      <input type="hidden" name="token" value="${escapeHtml(token)}" />
      <button type="submit" class="primary">Confirm my subscription</button>
    </form>`
  );
};

// Step 2, the button: a real person clicked, now the address is recorded.
export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const token = String(form.get("token") || "");

    const email = verifyToken(token);

    const result = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (result.error) {
      // Clicking the link twice must not show an error if the contact already exists.
      const alreadyExists =
        result.error.statusCode === 409 || /already exist/i.test(result.error.message);

      if (!alreadyExists) {
        console.error("Newsletter contact creation failed:", result.error);
        return failurePage(
          "Your subscription could not be recorded. Please try again in a moment, or write to contact@peoplesrepublicofbulgaria.com.",
          502
        );
      }
    }

    console.log("Newsletter contact confirmed:", result.data?.id ?? "already exists");

    return statusPage(
      "You're on the list",
      "Thanks for confirming. Grab a coffee, the next newsletter is on its way. While you wait, the channel is one tap away.",
      200,
      `<a class="primary" href="${SUBSCRIBE_URL}">Subscribe on YouTube</a>
      <a class="secondary" href="/">Back to PRB</a>`
    );
  } catch (error) {
    console.error("Newsletter confirm error:", error);

    return failurePage("This confirmation link is invalid or has expired (links last 24 hours).", 400);
  }
};

function failurePage(message: string, status: number) {
  return statusPage(
    "That did not work",
    message,
    status,
    `<a class="primary" href="/#newsletter">Sign up again</a>
    <a class="secondary" href="/">Back to PRB</a>`
  );
}

// Same look as the home page: cream paper, bordeaux, green and red rule, logo.
function statusPage(title: string, message: string, status: number, actions: string) {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>${title} | People's Republic of Bulgaria</title>
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <style>
    @font-face { font-family: "Oswald"; font-weight: 600; font-display: swap; src: url("/fonts/oswald-600-latin.woff2") format("woff2"); }
    @font-face { font-family: "Source Serif 4"; font-weight: 400; font-display: swap; src: url("/fonts/source-serif-4-400-latin.woff2") format("woff2"); }
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: flex; flex-direction: column; background: #140405; color: #f3deb4;
      font: 1.125rem/1.6 "Source Serif 4", Georgia, serif; }
    .rule { height: 6px; background: linear-gradient(#4a6236 0 3px, #8b1f10 3px 6px); }
    .rule:last-child { margin-top: auto; background: linear-gradient(#8b1f10 0 3px, #4a6236 3px 6px); }
    main { width: 100%; padding: 3rem clamp(1.1rem, 4.5vw, 5rem) 4rem; }
    img { display: block; margin: 0 0 1.5rem; rotate: -8deg; filter: drop-shadow(0 8px 20px rgba(0,0,0,.6)); }
    h1 { margin: 0 0 1rem; max-width: 16ch; font: 600 clamp(2.4rem, 10vw, 6.5rem)/0.92 "Oswald", "Arial Narrow", sans-serif;
      text-transform: uppercase; color: #f3deb4; }
    p { margin: 0 0 1.75rem; max-width: 34rem; color: #d9c39a; }
    .actions { display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem; align-items: center; }
    form { margin: 0; }
    .primary, .secondary { display: inline-flex; align-items: center; justify-content: center; min-height: 56px;
      padding: 0 1.75rem; border: 0; text-decoration: none; cursor: pointer;
      font: 600 1.125rem "Oswald", "Arial Narrow", sans-serif; letter-spacing: 0.1em; text-transform: uppercase; }
    .primary { background: #f3deb4; color: #5a0e0c; }
    .primary:hover { background: #fff; }
    .secondary { background: transparent; color: #f3deb4; min-height: 44px; padding: 0;
      text-decoration: underline; text-underline-offset: 0.2em; }
    .primary:focus-visible, .secondary:focus-visible { outline: 3px solid #f3deb4; outline-offset: 3px; }
  </style>
</head>
<body>
  <div class="rule" aria-hidden="true"></div>
  <main>
    <img src="/brand/logo-160.webp" srcset="/brand/logo-160.webp 1x, /brand/logo-320.webp 2x" width="104" height="104" alt="PRB logo" />
    <h1>${title}</h1>
    <p>${message}</p>
    <div class="actions">${actions}</div>
  </main>
  <div class="rule" aria-hidden="true"></div>
</body>
</html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}