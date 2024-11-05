import express from "express"
import productController from "../controllers/productController.js";
import userController from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js"
import multer from "multer";

//Router paths to execute endpoins
const router = express.Router()

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp 
    }
  });
  
  // Create Multer instance
  const upload = multer({ storage });
  
//Routes
router.post("/user", userController.registerUser)
router.post("/user/login", userController.loginUser)
router.post("/product", upload.array('pictures', 5),  productController.createProduct)
router.get("/product", productController.getProducts)
router.get("/product/:id", protect, productController.getProduct)
router.get("/products/category/:category", productController.getProductsByCategory);
router.delete("/product/:id", protect, productController.deleteProduct)
router.put("/product/:id", protect, productController.updateProduct)

export default router;