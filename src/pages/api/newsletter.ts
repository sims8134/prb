import type { APIRoute } from "astro";
import { Resend } from "resend";
import crypto from "node:crypto";

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

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const email = String(formData.get("email") || "").trim().toLowerCase();
    const website = String(formData.get("website") || "").trim();
    const consent = String(formData.get("consent") || "").trim();

    if (website) {
      return new Response(JSON.stringify({ error: "Spam detected." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return new Response(JSON.stringify({ error: "Please enter a valid email." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!consent) {
      return new Response(
        JSON.stringify({ error: "You must accept the privacy policy to subscribe." }),
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
      subject: "Confirm your newsletter subscription",
      html: `
        <div style="background:#111111;padding:40px 20px;color:#f0ebe0;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:640px;margin:0 auto;background:#1a1a1a;border:1px solid #2f2f2f;">
            <div style="padding:32px 24px 20px 24px;text-align:center;">
              <img src="https://peoplesrepublicofbulgaria.com/png/PRB_logo.png" alt="PRB" width="90" style="display:block;margin:0 auto 16px auto;">
              <h1 style="margin:0;font-size:30px;line-height:1.2;color:#f0ebe0;text-transform:uppercase;">
                People's Republic of Bulgaria
              </h1>
            </div>

            <div style="height:4px;background:#D62612;"></div>

            <div style="padding:28px 24px;">
              <p style="margin:0 0 16px 0;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#D62612;font-weight:bold;">
                Newsletter confirmation
              </p>

              <p style="margin:0 0 18px 0;font-size:16px;line-height:1.8;color:#c7c7c7;">
                Thank you for your interest. Please confirm your subscription by clicking the button below.
              </p>

              <p style="margin:0 0 24px 0;font-size:16px;line-height:1.8;color:#c7c7c7;">
                You will only be subscribed after this confirmation.
              </p>

              <p style="margin:0 0 24px 0;">
                <a href="${confirmUrl}" style="display:inline-block;padding:14px 22px;background:#D62612;color:#ffffff;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">
                  Confirm subscription
                </a>
              </p>

              <p style="margin:0;font-size:13px;line-height:1.7;color:#999;">
                If you did not request this, you can ignore this email.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Newsletter confirmation email sent:", result);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Newsletter API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send confirmation email.",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};