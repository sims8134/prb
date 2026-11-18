import type { APIRoute } from "astro";
import { Resend } from "resend";
import { getClientIp, isBotSubmission, isRateLimited } from "../../lib/antibot";
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Honeypot filled or form sent too fast: pretend success, send nothing.
    if (isBotSubmission(formData)) {
      return json({ success: true }, 200);
    }

    const ip = getClientIp(request, () => clientAddress);
    if (isRateLimited("contact", ip)) {
      return json({ error: "Too many attempts. Please try again later." }, 429);
    }

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await resend.emails.send({
      from: "PRB Contact <contact@peoplesrepublicofbulgaria.com>",
      to: "contact@peoplesrepublicofbulgaria.com",
      replyTo: email,
      subject: `[PRB] ${subject} — ${name}`,
      text: `Name: ${name}
Email: ${email}

Message:
${message}`,
    });

    if (result.error) {
      console.error("Contact email failed:", result.error);
      return json({ error: "Failed to send message." }, 502);
    }

    console.log("Contact email sent:", result.data?.id);
    return json({ success: true }, 200);
  } catch (error) {
    console.error("Contact API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send message.",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};