import { Router } from "express";


const router = Router();

router.use("/", function (req, res) {
    res.send("hello");
});


export default router;