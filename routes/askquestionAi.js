import express from "express";
import { QuestionAi } from "../controllers/questions.js";

const router = express.Router();

router.post("/question", QuestionAi);

export default router;
