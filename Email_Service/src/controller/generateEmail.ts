import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai"; // Use default export for OpenAI
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const app: express.Application = express();
const prisma = new PrismaClient();

 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

export const generateEmail =  async (req: Request, res: Response) => {
    try {
      const { subject, recipient, description } = req.body;
  
      // Create a dynamic prompt based on subject and description
      let prompt = `Write a professional email body for the subject: "${subject}".`;
  
      if (description) {
        prompt += ` The description of the email is: "${description}". Use this information to write a relevant and professional email body.`;
      }
  
      // Request body generation from OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          { role: "user", content: prompt },
        ],
      });
  
      const body = completion.choices[0].message.content ?? "Default email body";
  
      // Save the email details to the database
      const email = await prisma.email.create({
        data: { subject, recipient, body },
        select:{
          id:true,
          subject:true,
          recipient:true,
          body:true
        }
      });
  
      // Send response
      res.json(email);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate email" });
    }
  }
  
  
  