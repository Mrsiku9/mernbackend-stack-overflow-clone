import express from "express";
import weatherReport from "../controllers/weatherReport.js"

const router = express.Router();

router.get("/weather", weatherReport);

export default router;



