
const express = require('express');
const router = express.Router();
import { generateEmail } from "../controller/generateEmail";
import { sendemail } from "../controller/sendEmail";

// router.post("/generate-email", generateEmail)
router.post("/send-Email", sendemail)
 

export default router;

