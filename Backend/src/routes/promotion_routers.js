import { Router } from "express";

const promotionRouter = Router();

import {
    createPromotion,
    deletePromotions,
    getPromotions,
    updatePromotion,
} from "../controllers/promotion_Controllers.js";

promotionRouter.get("/", getPromotions);
promotionRouter.post("/", createPromotion);
promotionRouter.put("/:id", updatePromotion);
promotionRouter.delete("/:id", deletePromotions)

export default promotionRouter;