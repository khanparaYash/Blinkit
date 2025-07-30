import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { AddProductController, DeleteProduct, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductController } from "../controllers/product.controller.js";
import {admin}from "../middleware/admin.js"
const router = Router();
router.post("/add-product",auth,admin, AddProductController);
router.post("/get-product", getProductController);
router.post("/get-product-by-category", getProductByCategory);
router.post("/get-product-by-category-subCategory", getProductByCategoryAndSubCategory);
router.post("/get-product-Details", getProductDetails);
router.put("/update-product",auth,admin, updateProductController);
router.delete("/delete-product",auth,admin, DeleteProduct);
router.post("/search-product",searchProduct);
export default router;
