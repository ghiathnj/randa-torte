import nodemailer from "nodemailer";
import type { OrderInput } from "./validation";

const occasionLabels: Record<OrderInput["occasion"], { de: string; en: string }> =
  {
    wedding: { de: "Hochzeit", en: "Wedding" },
    birthday: { de: "Geburtstag", en: "Birthday" },
    baptism: { de: "Taufe", en: "Baptism" },
    anniversary: { de: "Jahrestag", en: "Anniversary" },
    corporate: { de: "Firmenfeier", en: "Corporate event" },
    other: { de: "Sonstiges", en: "Other" },
  };

function transport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 1025),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      : undefined,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px;color:#888;font-size:13px;">${escapeHtml(label)}</td><td style="padding:6px 12px;color:#1a1a1a;font-size:14px;">${escapeHtml(value)}</td></tr>`;
}

export async function sendOrderEmails(order: OrderInput, locale: "de" | "en") {
  const t = transport();
  const occasion = occasionLabels[order.occasion][locale];
  const from =
    process.env.SMTP_FROM ||
    "Randa Torten <bestellung@randa-torten.de>";
  const to = process.env.CONTACT_EMAIL || "randa@example.com";

  const adminHtml = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#FAF3E7;padding:32px;">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(201,71,107,0.08);">
        <div style="background:linear-gradient(135deg,#C9476B,#D4A574);padding:24px 32px;color:#fff;">
          <div style="font-size:14px;opacity:.85;">Neue Anfrage · Randa Torten</div>
          <div style="font-size:24px;font-weight:600;margin-top:4px;">${escapeHtml(order.name)}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;margin:8px 0;">
          ${row("Anlass", occasion)}
          ${row("Datum", order.date)}
          ${row("Personen", String(order.guests))}
          ${row("E-Mail", order.email)}
          ${row("Telefon", order.phone)}
          ${order.address ? row("Adresse", order.address) : ""}
        </table>
        <div style="padding:16px 32px;">
          <div style="color:#888;font-size:13px;margin-bottom:6px;">Geschmack & Wünsche</div>
          <div style="background:#FAF3E7;padding:16px;border-radius:12px;font-size:14px;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(order.flavor)}</div>
        </div>
        ${
          order.message
            ? `<div style="padding:0 32px 16px;">
                <div style="color:#888;font-size:13px;margin-bottom:6px;">Weitere Nachricht</div>
                <div style="background:#FAF3E7;padding:16px;border-radius:12px;font-size:14px;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(order.message)}</div>
              </div>`
            : ""
        }
        <div style="padding:16px 32px 32px;color:#888;font-size:12px;text-align:center;">
          Eingegangen am ${new Date().toLocaleString(locale === "de" ? "de-DE" : "en-GB")}
        </div>
      </div>
    </div>
  `;

  const customerHtml = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#FAF3E7;padding:32px;">
      <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:40px 32px;box-shadow:0 8px 32px rgba(201,71,107,0.08);">
        <div style="font-family:Georgia,serif;font-size:28px;color:#C9476B;margin-bottom:8px;">${
          locale === "de" ? "Vielen Dank!" : "Thank you!"
        }</div>
        <p style="color:#1a1a1a;font-size:15px;line-height:1.6;">
          ${
            locale === "de"
              ? `Liebe/r ${escapeHtml(order.name)},<br><br>deine Anfrage ist bei mir eingegangen. Ich melde mich innerhalb von 24 Stunden mit einem persönlichen Angebot bei dir.`
              : `Dear ${escapeHtml(order.name)},<br><br>your request has been received. I will get back to you within 24 hours with a personal quote.`
          }
        </p>
        <p style="color:#1a1a1a;font-size:15px;line-height:1.6;">
          ${
            locale === "de"
              ? "Bis ganz bald,<br>Randa"
              : "Talk soon,<br>Randa"
          }
        </p>
        <div style="border-top:1px solid #F5C2C7;margin:24px 0;"></div>
        <div style="font-family:Georgia,serif;color:#C9476B;font-size:18px;">Randa Torten</div>
        <div style="color:#888;font-size:13px;">${
          locale === "de"
            ? "Handgemacht mit Liebe in Karlsruhe"
            : "Handmade with love in Karlsruhe"
        }</div>
      </div>
    </div>
  `;

  await Promise.all([
    t.sendMail({
      from,
      to,
      replyTo: order.email,
      subject: `Neue Anfrage: ${occasion} – ${order.name}`,
      html: adminHtml,
    }),
    t.sendMail({
      from,
      to: order.email,
      subject:
        locale === "de"
          ? "Deine Anfrage bei Randa Torten"
          : "Your request at Randa Torten",
      html: customerHtml,
    }),
  ]);
}
