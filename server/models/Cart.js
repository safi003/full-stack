import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  title: String,
  price: Number,
  thumbnail: String,
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
