import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai"; // Use default export for OpenAI
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const app: express.Application = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

 import indexRoutes from "./routes/index"
 
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

 
app.use("/api",indexRoutes)
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));