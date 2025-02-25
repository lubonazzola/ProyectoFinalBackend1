import { Router } from "express";
import { Cart } from "../models/Cart.js";
import { cartFileManager } from "../dao/fsManager.js";

const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.product");
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    const product = await Product.findById(req.params.pid);

    if (!cart || !product) return res.status(404).json({ message: "Carrito o producto no encontrado" });

    const existingProduct = cart.products.find((p) => p.product.equals(product._id));

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: product._id, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.products = cart.products.filter((p) => !p.product.equals(req.params.pid));

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: req.body.products }, { new: true });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const productToUpdate = cart.products.find((p) => p.product.equals(req.params.pid));
    if (!productToUpdate) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    productToUpdate.quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: [] }, { new: true });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
