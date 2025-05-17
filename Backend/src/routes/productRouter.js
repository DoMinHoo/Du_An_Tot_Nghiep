import { Router } from "express";
import {
  getAllProducts,
  getProductDetail,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductDetail);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
