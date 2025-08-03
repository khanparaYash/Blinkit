import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  AddCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";
const router = Router();

router.post("/add-category", auth, AddCategoryController);
router.get("/get-category",  getCategoryController);
router.put("/update-category",auth, updateCategoryController);
router.delete("/delete-category",auth, deleteCategoryController);
export default router;
