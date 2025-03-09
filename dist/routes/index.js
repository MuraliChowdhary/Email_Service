"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const generateEmail_1 = require("../controller/generateEmail");
const sendEmail_1 = require("../controller/sendEmail");
router.post("/generate-email", generateEmail_1.generateEmail);
router.post("/send-Email", sendEmail_1.SendingEmail);
exports.default = router;
