import { Router } from "express";
import {auth} from "../middleware/auth.js";
import { AddCategoryController } from "../controllers/category.controller.js";
const router = Router();

router.post("/add-category", auth, AddCategoryController);

export default router;
