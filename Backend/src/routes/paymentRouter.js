import { Router } from "express";
import { createPayment, getMyPayments, getPaymentById, paymentWebhook } from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/auth.js";
const paymentRouter = Router();

paymentRouter.post("/", authMiddleware, createPayment);
paymentRouter.get("/:id", authMiddleware, getPaymentById);
paymentRouter.get("/user/my", authMiddleware, getMyPayments);


// Webhook (no auth)
paymentRouter.post('/webhook', paymentWebhook);

export default paymentRouter;
