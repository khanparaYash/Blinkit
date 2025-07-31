import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addToCartController, deleteCartItemQtyController, getCartItemController, updateCartQtyController } from "../controllers/cart.controller.js";
const router = Router();

router.post("/add-cart", auth, addToCartController);
router.get("/get-cart", auth, getCartItemController);
router.put("/update-qty-cart", auth, updateCartQtyController);
router.delete("/delete-cart", auth, deleteCartItemQtyController);

export default router;
