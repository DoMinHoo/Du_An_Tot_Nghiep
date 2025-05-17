import { Router } from "express";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
     getOneCategory
} from "../controllers/category.controller.js";

const router = Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:id", getOneCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
