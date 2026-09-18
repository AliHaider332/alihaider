// app/actions/contact.ts
'use server';

import nodemailer from 'nodemailer';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ContactFormState {
  ok: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
  values?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(formData: FormData): ContactFormState | null {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const errors: ContactFormState['errors'] = {};

  if (name.length < 2) errors.name = 'Please enter your name.';
  if (name.length > 80) errors.name = 'Name is too long.';

  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(email)) errors.email = 'That email looks invalid.';

  if (message.length < 10) errors.message = 'Tell me a bit more (10+ characters).';
  if (message.length > 5000) errors.message = 'Message is too long (max 5000).';

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: 'Please fix the highlighted fields.',
      errors,
      values: { name, email, message },
    };
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  HTML escape — prevent HTML injection into the email body           */
/* ------------------------------------------------------------------ */

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ------------------------------------------------------------------ */
/*  Transporter — created once, reused                                 */
/* ------------------------------------------------------------------ */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: Number(process.env.SMTP_PORT ?? 465) === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ------------------------------------------------------------------ */
/*  Action                                                             */
/* ------------------------------------------------------------------ */

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const invalid = validate(formData);
  if (invalid) return invalid;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return {
      ok: false,
      message: 'Email service is not configured. Please try again later.',
      values: { name, email, message },
    };
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p style="margin:0 0 6px"><strong>Name:</strong> ${esc(name)}</p>
          <p style="margin:0 0 6px"><strong>Email:</strong> ${esc(email)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${esc(message)}</p>
        </div>
      `,
    });

    return {
      ok: true,
      message: "Message sent — I'll get back to you soon.",
    };
  } catch (err) {
    console.error('[contact] send failed:', err);
    return {
      ok: false,
      message: 'Something went wrong sending your message. Please try again.',
      values: { name, email, message },
    };
  }
}