import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { AddSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";
const router = Router();
router.post("/add-subCategory",auth,AddSubCategoryController)
router.get("/get-subCategory",auth,getSubCategoryController)
router.put("/update-subCategory",auth,updateSubCategoryController)
export default router