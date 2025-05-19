import { Router } from "express";


import productRouter from "./productRouter";
import promotionRouter from "./promotion_routers";
import categoryRouter from "./category.routes.js";
import cartRouter from "./cart.routes.js";

const router = Router();

router.use("/promotions", promotionRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use('/cart', cartRouter);
// router.use("/orders", productRouter);


export default router;