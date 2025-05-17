import { Router } from "express";

import productRouter from "./productRouter";
import promotionRouter from "./promotion_routers";

const router = Router();

router.use("/promotions", promotionRouter);
router.use("/products", productRouter);
// router.use("/orders", productRouter);

export default router;