import { getAccessToken, getCurrentUser } from './googleAuth';
import { ApprenticeResult } from '../data/senaData';

/**
 * Encodes a string into RFC 4648 Base64URL safe format, handling UTF-8 characters correctly.
 */
function toBase64Url(str: string): string {
  // UTF-8 encode the string first
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  const len = utf8Bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Builds an RFC 2822 email format string with MIME HTML support.
 */
function createMimeMessage(params: {
  from?: string;
  to: string;
  cc?: string;
  subject: string;
  htmlBody: string;
}): string {
  const { from, to, cc, subject, htmlBody } = params;
  
  // Clean headers (no newline injections)
  const safeSubject = subject.replace(/[\r\n]/g, ' ');
  const safeTo = to.replace(/[\r\n]/g, ' ');
  const safeCc = cc ? cc.replace(/[\r\n]/g, ' ') : '';
  const safeFrom = from ? from.replace(/[\r\n]/g, ' ') : '';

  const lines = [
    `Content-Type: text/html; charset="UTF-8"`,
    `MIME-Version: 1.0`,
    `Content-Transfer-Encoding: 7bit`,
    `To: ${safeTo}`,
    safeCc ? `Cc: ${safeCc}` : '',
    safeFrom ? `From: ${safeFrom}` : '',
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(safeSubject)))}?=`,
    '',
    htmlBody
  ].filter(line => line !== '');

  return lines.join('\r\n');
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends an email using Gmail REST API messages.send endpoint.
 */
export async function sendGmailEmail(options: {
  to: string;
  cc?: string;
  subject: string;
  htmlBody: string;
}): Promise<SendEmailResult> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No hay una sesión de Google activa con permisos de Gmail. Por favor conecte su cuenta en la barra superior.');
  }

  const currentUser = getCurrentUser();
  const from = currentUser?.email || undefined;

  const rawMessage = createMimeMessage({
    from,
    to: options.to,
    cc: options.cc,
    subject: options.subject,
    htmlBody: options.htmlBody
  });

  const base64UrlMessage = toBase64Url(rawMessage);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: base64UrlMessage
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Error en Gmail API HTTP ${response.status}`;
    console.error('Error al enviar correo por Gmail:', errorData);
    throw new Error(message);
  }

  const result = await response.json();
  return {
    success: true,
    messageId: result.id
  };
}

/**
 * Generates official SENA HTML template for Apprentice Induction Certificate
 */
export function buildCertificateEmailHtml(result: ApprenticeResult): string {
  const verificationCode = `SENA-${result.trainingCard}-${result.documentNumber.slice(-4)}-${Date.now().toString(36).toUpperCase()}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Certificado de Inducción SENA</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <tr>
      <td style="background-color: #00324D; padding: 28px 24px; text-align: center;">
        <div style="font-size: 11px; font-weight: 700; color: #39A900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;">
          República de Colombia · Ministerio del Trabajo
        </div>
        <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: 1px;">
          SENA
        </h1>
        <div style="font-size: 13px; font-weight: 600; color: #e2e8f0; margin-top: 4px;">
          Servicio Nacional de Aprendizaje
        </div>
        <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
          ${result.center || 'Centro de Formación SENA'}
        </div>
      </td>
    </tr>

    <!-- Green Accent Bar -->
    <tr>
      <td style="height: 6px; background-color: #39A900;"></td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px 28px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="display: inline-block; padding: 4px 12px; background-color: #ecfdf5; color: #007832; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
            Constancia Oficial de Inducción Institucional
          </span>
          <h2 style="margin: 12px 0 0 0; font-size: 20px; color: #0f172a; font-weight: 800;">
            Aprobación del Proceso de Inducción
          </h2>
          <p style="margin: 6px 0 0 0; font-size: 12px; color: #64748b;">
            Acuerdo 009 de 2024 · Reglamento del Aprendiz SENA
          </p>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px;">
          Estimado(a) aprendiz <strong>${result.fullName}</strong>, la Coordinación Académica y el Equipo de Inducción se complacen en notificarle que ha culminado satisfactoriamente la inducción institucional.
        </p>

        <!-- Apprentice Details Box -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px;">
          <tr>
            <td style="padding: 6px 10px; color: #64748b; width: 40%;"><strong>Documento:</strong></td>
            <td style="padding: 6px 10px; color: #0f172a; font-family: monospace; font-weight: 600;">
              ${result.documentType || 'CC'} ${result.documentNumber}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 10px; color: #64748b;"><strong>Ficha de Caracterización:</strong></td>
            <td style="padding: 6px 10px; color: #0f172a; font-family: monospace; font-weight: 600;">
              ${result.trainingCard}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 10px; color: #64748b;"><strong>Programa de Formación:</strong></td>
            <td style="padding: 6px 10px; color: #0f172a; font-weight: 600;">
              ${result.program}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 10px; color: #64748b;"><strong>Correo Institucional:</strong></td>
            <td style="padding: 6px 10px; color: #007832; font-family: monospace;">
              ${result.emailSoySena || 'No especificado'}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 10px; color: #64748b;"><strong>Calificación Obtenida:</strong></td>
            <td style="padding: 6px 10px; color: #007832; font-weight: 800; font-size: 15px;">
              ${result.score} / 100 PUNTOS (COMPETENCIA APROBADA)
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 10px; color: #64748b;"><strong>Fecha de Registro:</strong></td>
            <td style="padding: 6px 10px; color: #0f172a;">
              ${result.date}
            </td>
          </tr>
        </table>

        <!-- Verification Banner -->
        <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; margin-bottom: 4px;">
            Código Único de Verificación Electrónica:
          </div>
          <div style="font-family: monospace; font-size: 14px; font-weight: 700; color: #00324D; letter-spacing: 1px;">
            ${verificationCode}
          </div>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">
            Validez institucional nacional bajo el Decreto 118 de 1957
          </div>
        </div>

        <p style="font-size: 13px; line-height: 1.6; color: #475569; margin: 0 0 16px 0;">
          Recuerda que como aprendiz SENA tienes derecho a la formación integral y el deber de respetar el Reglamento del Aprendiz (Acuerdo 009 de 2024), cuidando los ambientes de formación y participando activamente de tu ruta pedagógica.
        </p>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <strong>Servicio Nacional de Aprendizaje - SENA</strong><br>
          Regional Colombia · Dirección de Formación Profesional
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
        Este es un mensaje institucional generado automáticamente mediante la integración de Gmail de la Plataforma de Inducción SENA.
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Sends the official certificate email to the apprentice and optional CC instructor.
 */
export async function sendApprenticeCertificateEmail(
  result: ApprenticeResult,
  customRecipient?: string,
  ccEmail?: string
): Promise<SendEmailResult> {
  const recipient = customRecipient || result.emailSoySena;
  if (!recipient) {
    throw new Error('El aprendiz no tiene un correo electrónico registrado.');
  }

  const subject = `SENA · Constancia de Aprobación de Inducción Institucional - Ficha ${result.trainingCard} (${result.fullName})`;
  const htmlBody = buildCertificateEmailHtml(result);

  return sendGmailEmail({
    to: recipient,
    cc: ccEmail,
    subject,
    htmlBody
  });
}

/**
 * Sends a cohort digest summary to instructor or coordinator.
 */
export async function sendCohortSummaryEmail(params: {
  instructorEmail: string;
  trainingCard: string;
  totalEvaluated: number;
  passedCount: number;
  passRate: number;
  averageScore: number;
  results: ApprenticeResult[];
}): Promise<SendEmailResult> {
  const { instructorEmail, trainingCard, totalEvaluated, passedCount, passRate, averageScore, results } = params;

  const rowsHtml = results.map(r => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 8px 10px; font-weight: 600; font-size: 12px;">${r.fullName}</td>
      <td style="padding: 8px 10px; font-family: monospace; font-size: 11px;">${r.documentNumber}</td>
      <td style="padding: 8px 10px; font-size: 11px;">${r.emailSoySena || 'N/A'}</td>
      <td style="padding: 8px 10px; font-size: 12px; font-weight: 700; color: ${r.passed ? '#007832' : '#dc2626'}; text-align: center;">${r.score}%</td>
      <td style="padding: 8px 10px; font-size: 11px; text-align: center;">${r.passed ? 'APROBADO' : 'REFORZAR'}</td>
    </tr>
  `).join('');

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #39A900; padding-bottom: 16px; margin-bottom: 20px;">
      <div>
        <h2 style="margin: 0; color: #00324D; font-size: 20px; font-weight: 800;">Reporte Consolidado de Inducción SENA</h2>
        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Ficha de Caracterización: <strong>${trainingCard}</strong></div>
      </div>
      <div style="text-align: right; font-size: 11px; color: #94a3b8;">
        Fecha: ${new Date().toLocaleDateString('es-CO')}
      </div>
    </div>

    <!-- KPIs -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; text-align: center;">
      <tr>
        <td style="background-color: #f1f5f9; padding: 14px; border-radius: 8px; width: 25%;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748b;">Evaluados</div>
          <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">${totalEvaluated}</div>
        </td>
        <td style="width: 2%;"></td>
        <td style="background-color: #ecfdf5; padding: 14px; border-radius: 8px; width: 25%;">
          <div style="font-size: 11px; text-transform: uppercase; color: #007832;">Aprobados</div>
          <div style="font-size: 20px; font-weight: 800; color: #007832; margin-top: 4px;">${passedCount}</div>
        </td>
        <td style="width: 2%;"></td>
        <td style="background-color: #f1f5f9; padding: 14px; border-radius: 8px; width: 25%;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748b;">Tasa Éxito</div>
          <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">${passRate}%</div>
        </td>
        <td style="width: 2%;"></td>
        <td style="background-color: #f1f5f9; padding: 14px; border-radius: 8px; width: 25%;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748b;">Promedio</div>
          <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">${averageScore} pts</div>
        </td>
      </tr>
    </table>

    <h3 style="font-size: 14px; color: #0f172a; margin-bottom: 10px;">Detalle por Aprendiz:</h3>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 24px;">
      <thead>
        <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0; text-align: left; font-size: 11px; color: #64748b; text-transform: uppercase;">
          <th style="padding: 8px 10px;">Aprendiz</th>
          <th style="padding: 8px 10px;">Documento</th>
          <th style="padding: 8px 10px;">Correo SoySena</th>
          <th style="padding: 8px 10px; text-align: center;">Puntaje</th>
          <th style="padding: 8px 10px; text-align: center;">Estado</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 11px; color: #94a3b8; text-align: center;">
      Generado por la Plataforma de Inducción SENA con Google Workspace & Gmail API.
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendGmailEmail({
    to: instructorEmail,
    subject: `SENA Reporte Inducción · Ficha ${trainingCard} (${totalEvaluated} aprendices evaluados)`,
    htmlBody
  });
}
