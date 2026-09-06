import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const from =
  process.env.RESEND_FROM ?? 'Eólicos Gallego <hola@eolicosgallego.com>';

export async function sendAppEmail(input: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.info('[email:dev]', input.subject, input.to);
    return;
  }
  await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
  });
}

export function verificationEmailHtml(name: string, url: string, otp?: string) {
  return `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
      <h1 style="font-size:22px">Confirma tu correo, ${name}</h1>
      <p>Para entrar a Eólicos Gallego verifica tu email.</p>
      <p><a href="${url}" style="display:inline-block;background:#0284c7;color:white;padding:12px 18px;border-radius:8px;text-decoration:none">Verificar correo</a></p>
      ${otp ? `<p>También puedes usar este código: <strong>${otp}</strong></p>` : ''}
      <p style="color:#64748b;font-size:13px">Si no creaste esta cuenta, ignora este mensaje.</p>
    </div>
  `;
}

export function twoFactorEmailHtml(otp: string) {
  return `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
      <h1 style="font-size:22px">Código de verificación</h1>
      <p>Tu código 2FA de Eólicos Gallego es:</p>
      <p style="font-size:32px;letter-spacing:6px;font-weight:700">${otp}</p>
      <p style="color:#64748b;font-size:13px">Caduca en pocos minutos.</p>
    </div>
  `;
}
