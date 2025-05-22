import { Router } from "express";


import productRouter from "./productRouter";
import promotionRouter from "./promotion_routers";
import orderRouter from "./orderRouter.js";
import categoryRouter from "./category.routes.js";
import cartRouter from "./cart.routes.js";
import authRouter from "./authRouter.js";
import paymentRouter from "./paymentRouter.js";


const router = Router();

router.use("/promotions", promotionRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use('/cart', cartRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);
router.use("/payments", paymentRouter);


export default router;