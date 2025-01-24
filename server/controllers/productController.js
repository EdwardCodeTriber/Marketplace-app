import Products from "../models/product.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyByKUjeMO7CJFyUxyabcVFAJ8h3EfquYzg",
  authDomain: "employee-node-6d9ec.firebaseapp.com",
  projectId: "employee-node-6d9ec",
  storageBucket: "employee-node-6d9ec.appspot.com",
  messagingSenderId: "951749396320",
  appId: "1:951749396320:web:a80e55bd24c39484af8005"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Create product function
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const files = req.files; // Assuming you're using middleware like multer

    // Array to store picture URLs
    const pictureUrls = [];

    // Upload each picture to Firebase
    if (files && files.length > 0) {
      for (const file of files) {
        // Create a reference to Firebase storage
        const storageRef = ref(storage, `products/${Date.now()}_${file.originalname}`);
        
        // Upload file
        const snapshot = await uploadBytes(storageRef, file.buffer);
        
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        // Store URL in pictureUrls array
        pictureUrls.push(downloadURL);
      }
    }

    // Create product with picture URLs
    const product = await Products.create({
      name,
      description,
      category,
      price,
      pictures: pictureUrls
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ 
      error: "An error occurred when creating a Product",
      details: error.message 
    });
  }
};
// const createProduct = async (req, res) => {
//   try {
//     const product = await Products.create(req.body);
//     res.status(201).json(product);
//   } catch (error) {
//     //  error post
//     res
//       .status(500)
//       .json({ error: "An Error has occured when creating a Product" });
//   }
// };

// Get category function
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category; // Get category from request parameters
    const products = await Product.find({ category });
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving products by category" });
  }
};



// Get all product function
const getProducts = async (req, res) => {
  try {
    //pagination for page popoulation
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const products = await Products.find().skip(skip).limit(limit);

    const totalProducts = await Products.countDocuments();
    res.status(200).json({ products, totalProducts, page, limit });
  } catch (error) {
    //  ID check

    console.error(error);
    res
      .status(500)
      .json({ error: "An error has occured when getting Product" });
  }
};

// Get product by ID function
const getProduct = async (req, res) => {
  try {
    const productId = await req.params.id;
    const product = await Products.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    //  ID check

    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid product ID provided" });
    } else {
      res.status(500).json({ error: "An error is encounters" });
    }
  }
};

// Delete function
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    //  ID check

    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid product ID provided" });
    } else {
      res.status(500).json({ error: "An error was encountered" });
    }
  }
};

// Update function
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );
    //  ID check
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    //Error massage for Incorect ID provided
    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid product ID provided" });
    } else {
      res.status(500).json({ error: "An error was encountered" });
    }
  }
};



export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,

};
