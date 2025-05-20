// supportController.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

console.log(process.env.EMAIL_USER,process.env.EMAIL_APP_PASSWORD)
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email (e.g., muralisudireddy0@gmail.com)
    pass: process.env.EMAIL_APP_PASSWORD // your app password
  }
});

export const sendemail =  async (req: express.Request, res: express.Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
     res.status(400).json({ error: "Name, Email, and Message are required" });
     return
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "muralisudireddy@gmail.com", // receiver email
      subject: "New Support Query from PrimeMart",
      text: `
You received a new message from your IMS support form:

Name: ${name}
Email: ${email}

Message:
${message}
      `
    });

    res.status(200).json({ message: "Support email sent successfully." });
  } catch (error) {
    console.error("Error sending support email:", error);
    res.status(500).json({ error: "Failed to send support email." });
  }
};

export default router;
