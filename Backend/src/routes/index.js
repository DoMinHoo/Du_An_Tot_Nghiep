import { Router } from "express";
import productRouter from "./productRouter";



const router = Router();

router.use("/products", productRouter);

router.use("/", function (req, res) {
    res.send("hello");
});


export default router;