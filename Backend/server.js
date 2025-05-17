import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import connectMongoDB from "./src/config/db.js";



const app = express();
app.use(cors());

// Middleware để phân tích JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// chay connectDB truoc routes
connectMongoDB("mongodb://127.0.0.1:27017/Du_An_Tot_Nghiep");

//chạy seeder data product
// seedProducts();

app.use("/", router);

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;