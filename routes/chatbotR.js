import express from "express";
import aiChatBot from "../controllers/aichatbot.js";

const router = express.Router();

router.post("/chatbot", aiChatBot);

export default router;
