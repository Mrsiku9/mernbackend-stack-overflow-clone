import express from "express";
import paymentInitiate, { getPaymentStatus } from "../controllers/payment.js";

const router = express.Router();
router.post("/create-checkout-session", paymentInitiate);
router.get("/check-payment-status", getPaymentStatus);

export default router;
