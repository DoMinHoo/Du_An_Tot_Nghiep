import { Router } from "express";
import promotionRouter from "./promotion_routers";

const router = Router();

router.use("/promotions", promotionRouter);
// router.use("/orders", productRouter);

export default router;