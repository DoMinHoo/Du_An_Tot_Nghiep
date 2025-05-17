import { Router } from "express";
import categoryRoutes from "./category.routes.js";

const router = Router();


router.use("/categories", categoryRoutes);

export default router;