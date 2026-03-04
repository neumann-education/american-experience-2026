const AE_SPREADSHEET_ID = '1NV8Qa4bJdVk1GhjXgyMGXFAd55CM94tel8LpqcHPPyI'
const AE_SHEET_NAME = 'Respuestas'
function doPost(e) {
  try {
    const {
      nombre = '',
      ciudad = '',
      correo = '',
      telefono = '',
      whatsapp = '',
      visa = '',
      pregunta = '',
      como = '',
    } = e.parameter || {}

    const ss = SpreadsheetApp.openById(AE_SPREADSHEET_ID)
    const sheet =
      ss.getSheetByName(AE_SHEET_NAME) || ss.insertSheet(AE_SHEET_NAME)

    const id = Utilities.getUuid()
    const fecha = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Lima',
    })

    const row = [
      id,
      fecha,
      nombre,
      ciudad,
      correo,
      telefono,
      whatsapp,
      visa,
      pregunta,
      como,
    ]

    sheet.appendRow(row)

    // email de confirmación más detallado
    try {
      const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmación de registro - American Experience 2026</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 30px 20px;
    }
    .welcome-message {
      font-size: 18px;
      color: #1e3a8a;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .details {
      background-color: #f1f5f9;
      border-left: 4px solid #1e3a8a;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .detail-row {
      display: flex;
      margin-bottom: 10px;
    }
    .detail-label {
      font-weight: 600;
      color: #374151;
      min-width: 140px;
    }
    .detail-value {
      color: #1f2937;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>American Experience 2026</h1>
      <p>Evento de Lanzamiento</p>
    </div>
    <div class="content">
      <p class="welcome-message">Gracias por inscribirte, ${nombre}!</p>
      <p>Tu registro ha sido recibido correctamente para el evento <strong>American Experience 2026</strong>. A continuación encontrarás los datos que nos proporcionaste.</p>
      <div class="details">
        <div class="detail-row">
          <span class="detail-label">Nombre</span>
          <span class="detail-value">${nombre}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Ciudad / País</span>
          <span class="detail-value">${ciudad}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Correo</span>
          <span class="detail-value">${correo}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Teléfono</span>
          <span class="detail-value">${telefono}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">WhatsApp</span>
          <span class="detail-value">${whatsapp}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Visa</span>
          <span class="detail-value">${visa}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Pregunta</span>
          <span class="detail-value">${pregunta}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Origen</span>
          <span class="detail-value">${como}</span>
        </div>
      </div>
      <p>Una asesora del programa se comunicará contigo pronto. Si tienes consultas, responde este correo o visita nuestro sitio.</p>
    </div>
    <div class="footer">
      © 2026 Blackwell Global University. Todos los derechos reservados.
      <br>Este es un mensaje automático, por favor no respondas directamente.
    </div>
  </div>
</body>
</html>
      `
      const plainBody =
        'Gracias por registrarte al Evento de Lanzamiento – American Experience 2026. Una asesora del programa se comunicará contigo.'

      MailApp.sendEmail({
        to: correo,
        subject: 'Confirmación de registro – American Experience 2026',
        htmlBody: htmlBody,
        body: plainBody,
        replyTo: 'info@americanexperience.com', // opciona, ajustar
      })
    } catch (mailErr) {
      console.error('Error enviando correo AE:', mailErr.message)
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}
