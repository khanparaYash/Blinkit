import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { AddProductToWishlistController, GetWishlistController, RemoveProductToWishlistController } from "../controllers/wishlist.controller.js";
const router = Router();
router.post("/add-ToWishlist",auth,AddProductToWishlistController)
router.delete("/remove-ToWishlist",auth,RemoveProductToWishlistController)
router.get("/get-Wishlist",auth,GetWishlistController)
export default router