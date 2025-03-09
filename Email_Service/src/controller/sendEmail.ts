
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const app: express.Application = express();
const prisma = new PrismaClient();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD  
    }
  });
   
  export const sendEmail = async (id: string) => {
    try {
      
      if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
        throw new Error('Email credentials not found in environment variables');
      }
  
       
      const data = await prisma.email.findUnique({ where: { id } });
      if (!data) {
        throw new Error('Email data not found');
      }
  
      const recipient = data.recipient;
      const subject = data.subject;
      const body = data.body;
  
      
      await transporter.verify();
      
       
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: subject,
        text: body,
      });
  
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; 
    }
  };
  
  
 export const SendingEmail =   async (req: Request, res: Response)=>{
    const { id } = req.body;

  
    if (!id) {
       res.status(400).json({ error: "Email ID is required" });
       //we need to go to the next middleware
       return
    }
  
    try {
      const result = await sendEmail(id);
      res.json({ message: "Email sent successfully", result });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: errorMessage });
    }
  };
  