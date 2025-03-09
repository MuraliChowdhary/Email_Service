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
exports.generateEmail = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const openai_1 = __importDefault(require("openai")); // Use default export for OpenAI
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const generateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { subject, recipient, description } = req.body;
        // Create a dynamic prompt based on subject and description
        let prompt = `Write a professional email body for the subject: "${subject}".`;
        if (description) {
            prompt += ` The description of the email is: "${description}". Use this information to write a relevant and professional email body.`;
        }
        // Request body generation from OpenAI
        const completion = yield openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [
                { role: "user", content: prompt },
            ],
        });
        const body = (_a = completion.choices[0].message.content) !== null && _a !== void 0 ? _a : "Default email body";
        // Save the email details to the database
        const email = yield prisma.email.create({
            data: { subject, recipient, body },
            select: {
                id: true,
                subject: true,
                recipient: true,
                body: true
            }
        });
        // Send response
        res.json(email);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate email" });
    }
});
exports.generateEmail = generateEmail;
