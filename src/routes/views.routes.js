import { Router } from "express";
import { Product } from "../models/Product.js";
import { productFileManager } from "../dao/fsManager.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Bienvenido a la página principal");
  });
  
 router.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.get("/products/category", async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.category });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;