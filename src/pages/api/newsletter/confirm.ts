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

export const GET: APIRoute = async ({ url, redirect }) => {
  try {
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response("Missing token.", { status: 400 });
    }

    const email = verifyToken(token);

    const result = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    console.log("Newsletter contact confirmed:", result);

    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Subscription confirmed</title>
        <style>
          body {
            margin: 0;
            background: #111;
            color: #f0ebe0;
            font-family: Arial, Helvetica, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
          }
          .box {
            max-width: 640px;
            width: 100%;
            background: #1a1a1a;
            border: 1px solid #333;
            padding: 32px;
            text-align: center;
          }
          h1 {
            margin: 0 0 16px 0;
            color: #D62612;
            text-transform: uppercase;
          }
          p {
            color: #ccc;
            line-height: 1.7;
            margin: 0 0 20px 0;
          }
          a {
            display: inline-block;
            padding: 12px 18px;
            background: #D62612;
            color: white;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Subscription confirmed</h1>
          <p>Your newsletter subscription has been confirmed successfully.</p>
          <a href="/">Back to website</a>
        </div>
      </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  } catch (error) {
    console.error("Newsletter confirm error:", error);

    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Confirmation failed</title>
        <style>
          body {
            margin: 0;
            background: #111;
            color: #f0ebe0;
            font-family: Arial, Helvetica, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
          }
          .box {
            max-width: 640px;
            width: 100%;
            background: #1a1a1a;
            border: 1px solid #333;
            padding: 32px;
            text-align: center;
          }
          h1 {
            margin: 0 0 16px 0;
            color: #D62612;
            text-transform: uppercase;
          }
          p {
            color: #ccc;
            line-height: 1.7;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Confirmation failed</h1>
          <p>The confirmation link is invalid or expired.</p>
        </div>
      </body>
      </html>
      `,
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
};