import express from "express";
import { getCart, addToCart, updateQuantity, removeFromCart, clearCart } from "../controllers/cartController.js";
import auth from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.put("/update", auth, updateQuantity);
router.delete("/remove/:productId", auth, removeFromCart);
router.delete("/clear", auth, clearCart);

export default router;
