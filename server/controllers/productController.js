import Products from "../models/product.js";

// Create product function
const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    //  error post
    res
      .status(500)
      .json({ error: "An Error has occured when creating a Product" });
  }
};

// Create product function
const cart = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    //  error post
    res
      .status(500)
      .json({ error: "An Error has occured when creating a Product" });
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
};
