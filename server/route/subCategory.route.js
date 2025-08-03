import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";
const router = Router();
router.post("/add-subCategory",auth,AddSubCategoryController)
router.get("/get-subCategory",getSubCategoryController)
router.put("/update-subCategory",auth,updateSubCategoryController)
router.delete("/delete-subCategory",auth,deleteSubCategoryController)
export default router