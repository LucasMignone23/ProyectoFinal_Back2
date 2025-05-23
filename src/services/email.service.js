import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // usa false si no es SSL (puerto 465)
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    // <— Permite certificados autofirmados
    rejectUnauthorized: false
  }
});

export const sendPurchaseMail = async (to, ticket) => {
  await transporter.sendMail({
    from: '"Store" <no-reply@store.com>',
    to,
    subject: 'Compra Confirmada',
    html: `<h1>Gracias por su compra</h1>
           <p>Código: ${ticket.code}</p>
           <p>Monto: $${ticket.amount}</p>`
  });
};
