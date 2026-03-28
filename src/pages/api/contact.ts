import type { APIRoute } from "astro";
import { Resend } from "resend";
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || "").trim();

    if (website) {
      return new Response(JSON.stringify({ error: "Spam detected." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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
console.log("Resend result:", result);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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