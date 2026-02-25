import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER as string,
    pass: process.env.GMAIL_APP_PASSWORD as string,
  },
})

interface InscripcionData {
  nombre: string
  email: string
  dni: string
  esAbogado?: boolean
  jurisdiccionMatricula?: string | null
  otraJurisdiccion?: string | null
  numeroMatricula?: string | null
}

export async function sendConfirmationEmail(data: InscripcionData): Promise<{ success: boolean; error?: string }> {
  try {
    const { nombre, email, dni, esAbogado, jurisdiccionMatricula, otraJurisdiccion, numeroMatricula } = data

    const abogadoInfo = esAbogado
      ? `
        <p style="margin: 0; padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">
          <strong>Matrícula:</strong> ${numeroMatricula || 'No especificada'}
        </p>
        <p style="margin: 0; padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">
          <strong>Jurisdicción:</strong> ${jurisdiccionMatricula === 'CPACF' ? 'CPACF' : otraJurisdiccion || 'No especificada'}
        </p>
      `
      : ''

    await transporter.sendMail({
      from: 'Simposio 2026 <simposio2026@usinadejusticia.org.ar>',
      to: email,
      subject: 'Confirmación de Inscripción - Simposio 2026',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Inscripción</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- Logos -->
            <table style="width: 100%; margin-bottom: 40px; padding: 20px 0; border-bottom: 2px solid #e2e8f0;">
              <tr>
                <td style="text-align: center; width: 33%;">
                  <img src="https://simposiousinadejusticia.org.ar/IVUJUS.png" alt="IVUJUS" style="height: 70px; display: inline-block; vertical-align: middle;">
                </td>
                <td style="text-align: center; width: 33%;">
                  <img src="https://simposiousinadejusticia.org.ar/logo-usina.png" alt="Usina de Justicia" style="height: 70px; display: inline-block; vertical-align: middle;">
                </td>
                <td style="text-align: center; width: 33%;">
                  <img src="https://simposiousinadejusticia.org.ar/Colegio_Abogados.png" alt="Colegio Público de la Abogacía" style="height: 90px; display: inline-block; vertical-align: middle;">
                </td>
              </tr>
            </table>

            <!-- Cuerpo del mensaje -->
            <p style="font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 20px;">
              Estimado/a <strong>${nombre}</strong>, por la presente se confirma su inscripción al <strong>Primer Simposio Americano y Europeo de Victimología Penal</strong>, bajo el lema "Las víctimas de homicidio en contexto de inseguridad".
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 30px;">
              El evento se realizará los días <strong style="color: #1e40af; font-size: 18px;">9 y 10 de abril de 2026</strong>, en el Auditorio del Colegio Público de la Abogacía (CPACF), <strong style="color: #1e40af; font-size: 18px;">Av. Corrientes 1441, CABA</strong>.
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 30px;">
              Las acreditaciones comienzan a las <strong style="color: #1e40af;">14:45 hs</strong>.
            </p>

            <!-- Datos del Registro -->
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px;">Datos del Registro</h3>
              <p style="margin: 0; padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">
                <strong>DNI:</strong> ${dni}
              </p>
              ${abogadoInfo}
            </div>

            <!-- Pie de página -->
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">Saludos Cordiales,</p>
              <p style="margin: 5px 0 0 0; color: #1e40af; font-weight: bold; font-size: 16px;">Usina de Justicia</p>
            </div>

          </div>
        </body>
        </html>
      `,
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}
