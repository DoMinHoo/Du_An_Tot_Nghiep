import { Router } from "express";

import categoryRoutes from "./category.routes.js";
import productRouter from "./productRouter";
import promotionRouter from "./promotion_routers";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use("/promotions", promotionRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRoutes);
// router.use("/orders", productRouter);
router.use("/orders", orderRouter);


export default router;