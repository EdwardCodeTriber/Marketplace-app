import express from "express"
import productController from "../controllers/productController.js";
import userController from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js"
//Router paths to execute endpoins
const router = express.Router()
//Routes
router.post("/user", userController.registerUser)
router.post("/user/login", userController.loginUser)
router.post("/product",  productController.createProduct)
router.get("/product", productController.getProducts)
router.get("/product/:id", protect, productController.getProduct)
router.get("/products/category/:category", productController.getProductsByCategory);
router.delete("/product/:id", protect, productController.deleteProduct)
router.put("/product/:id", protect, productController.updateProduct)

export default router;