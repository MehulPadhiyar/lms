import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Mehul Padhiyar',
    to: options.address,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
