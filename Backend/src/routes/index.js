import { Router } from "express";

import categoryRoutes from "./category.routes.js";
import productRouter from "./productRouter";
import promotionRouter from "./promotion_routers";
import { route } from "./cart.routes.js";

const router = Router();

router.use("/promotions", promotionRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRoutes);
router.use('/cart', cart);
// router.use("/orders", productRouter);


export default router;