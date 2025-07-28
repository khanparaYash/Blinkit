import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { AddProductController } from "../controllers/product.controller.js";

const router = Router();
router.post("/add-product",auth, AddProductController);
export default router;
