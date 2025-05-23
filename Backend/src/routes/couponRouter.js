import { Router } from "express";

const couponRouter = Router();

import { createCoupon, deleteCoupon, getAllCoupons, getOneCoupon, updateCoupon } from "../controllers/couponController.js";

couponRouter.get("/", getAllCoupons);
couponRouter.post("/", createCoupon);
couponRouter.get("/:id", getOneCoupon);
couponRouter.put("/:id", updateCoupon);
couponRouter.delete("/:id", deleteCoupon);


export default couponRouter;