import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pabloimed@hotmail.com",
        pass: process.env.EMAIL_PASS, // 🔑 clave de aplicación
      },
    });

    await transporter.sendMail({
      from: `"Web IMed" <adelinaimed@hotmail.com>`,
      to: "adelinaimed@hotmail.com",
      subject: `Nuevo contacto de ${nombre}`,
      replyTo: email,
      html: `
        <h3>Nuevo mensaje desde la web</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 500 });
  }
}