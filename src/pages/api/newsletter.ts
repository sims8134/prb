import type { APIRoute } from "astro";
import { Resend } from "resend";
import crypto from "node:crypto";
import {
  getClientIp,
  isBotSubmission,
  isDisposableEmail,
  isRateLimited,
  isValidEmail,
} from "../../lib/antibot";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const SECRET = import.meta.env.NEWSLETTER_CONFIRM_SECRET;
const SITE_URL = import.meta.env.SITE_URL;

function createToken(email: string) {
  const expires = Date.now() + 1000 * 60 * 60 * 24; // 24h
  const payload = `${email}|${expires}`;
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");

  return Buffer.from(`${payload}|${signature}`).toString("base64url");
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async (context) => {
  // clientAddress is read lazily: Astro throws if the host does not provide it.
  const { request } = context;
  try {
    const formData = await request.formData();

    const email = String(formData.get("email") || "").trim().toLowerCase();
    const consent = String(formData.get("consent") || "").trim();

    // Honeypot filled or form sent too fast: pretend success, send nothing.
    if (isBotSubmission(formData)) {
      return json({ success: true }, 200);
    }

    const ip = getClientIp(request, () => context.clientAddress);
    if (isRateLimited("newsletter", ip)) {
      return json({ error: "Too many attempts. Please try again later." }, 429);
    }

    if (!email) {
      return json({ error: "Email is required." }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ error: "Please enter a valid email." }, 400);
    }

    if (isDisposableEmail(email)) {
      return json({ error: "Disposable email addresses are not accepted." }, 400);
    }

    if (!consent) {
      return new Response(
        JSON.stringify({ error: "Please tick the box to agree to the newsletter and the privacy notice." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = createToken(email);
    const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${token}`;

    const result = await resend.emails.send({
      from: "PRB Newsletter <contact@peoplesrepublicofbulgaria.com>",
      to: email,
      subject: "PRB newsletter: one tap to confirm",
      text: `People's Republic of Bulgaria

Thanks for signing up to the PRB newsletter. One tap to confirm, then you're on the list:
${confirmUrl}

You will only be subscribed after this confirmation. The link is valid for 24 hours.
If you did not ask for this, just ignore this email.`,
      html: `
        <div style="background:#F3DEB4;padding:32px 16px;color:#2B1A12;font-family:Georgia,'Times New Roman',serif;">
          <div style="max-width:560px;margin:0 auto;background:#FBF1DC;border:2px solid #5A0E0C;">
            <div style="height:4px;background:#4A6236;"></div>
            <div style="height:4px;background:#8B1F10;"></div>
            <div style="padding:28px 24px 8px 24px;text-align:center;">
              <img src="https://peoplesrepublicofbulgaria.com/brand/email-logo-180.png" alt="PRB logo" width="90" height="90" style="display:block;margin:0 auto 14px auto;border:0;">
              <h1 style="margin:0;font-family:'Arial Narrow',Arial,Helvetica,sans-serif;font-size:24px;line-height:1.2;letter-spacing:1px;color:#5A0E0C;text-transform:uppercase;">
                People's Republic of Bulgaria
              </h1>
            </div>

            <div style="padding:20px 24px 28px 24px;">
              <p style="margin:0 0 14px 0;font-family:'Arial Narrow',Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#7A5A1E;font-weight:bold;">
                Newsletter confirmation
              </p>

              <p style="margin:0 0 16px 0;font-size:17px;line-height:1.6;">
                Thanks for signing up to the PRB newsletter. One tap to confirm, then you're on the list.
              </p>

              <p style="margin:0 0 24px 0;">
                <a href="${confirmUrl}" style="display:inline-block;padding:14px 22px;background:#5A0E0C;color:#F3DEB4;text-decoration:none;font-family:'Arial Narrow',Arial,Helvetica,sans-serif;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">
                  Confirm subscription
                </a>
              </p>

              <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;">
                You will only be subscribed after this confirmation. The link is valid for 24 hours.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#5C4636;">
                If you did not ask for this, just ignore this email.
              </p>
            </div>
            <div style="height:4px;background:#8B1F10;"></div>
            <div style="height:4px;background:#4A6236;"></div>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error("Newsletter confirmation email failed:", result.error);
      return json({ error: "Failed to send confirmation email." }, 502);
    }

    console.log("Newsletter confirmation email sent:", result.data?.id);

    return json({ success: true }, 200);
  } catch (error) {
    console.error("Newsletter API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send confirmation email.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};