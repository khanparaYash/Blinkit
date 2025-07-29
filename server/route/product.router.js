import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { AddProductController, getProductByCategory, getProductController } from "../controllers/product.controller.js";

const router = Router();
router.post("/add-product",auth, AddProductController);
router.post("/get-product", getProductController);
router.post("/get-product-by-category", getProductByCategory);
export default router;
