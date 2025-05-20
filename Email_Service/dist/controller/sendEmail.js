"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendemail = void 0;
// supportController.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
console.log(process.env.EMAIL_USER, process.env.EMAIL_APP_PASSWORD);
const router = express_1.default.Router();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // your email (e.g., muralisudireddy0@gmail.com)
        pass: process.env.EMAIL_APP_PASSWORD // your app password
    }
});
const sendemail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).json({ error: "Name, Email, and Message are required" });
        return;
    }
    try {
        yield transporter.sendMail({
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
    }
    catch (error) {
        console.error("Error sending support email:", error);
        res.status(500).json({ error: "Failed to send support email." });
    }
});
exports.sendemail = sendemail;
exports.default = router;
