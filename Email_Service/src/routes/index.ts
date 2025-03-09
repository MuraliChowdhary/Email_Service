
const express = require('express');
const router = express.Router();
import { generateEmail } from "../controller/generateEmail";
import { SendingEmail } from "../controller/sendEmail";

router.post("/generate-email", generateEmail)
router.post("/send-Email", SendingEmail)
 

export default router;

