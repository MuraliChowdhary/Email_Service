"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const sendEmail_1 = require("../controller/sendEmail");
// router.post("/generate-email", generateEmail)
router.post("/send-Email", sendEmail_1.sendemail);
exports.default = router;
