import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/product'; 

// // Create product
// export const createProduct = createAsyncThunk(
//   'products/createProduct',
//   async (productData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}`, productData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const API_URL = 'http://localhost:5000/api/product';

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

// Create product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const { images, ...productDetails } = productData;
      const pictureUrls = [];

      // Check if images exist
      if (!images || images.length === 0) {
        throw new Error('No images provided');
      }

      // Upload each image to Firebase
      for (const image of images) {
        try {
          // Create a reference to Firebase storage
          const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
          
          // Upload file
          const snapshot = await uploadBytes(storageRef, image);
          
          // Get download URL
          const downloadURL = await getDownloadURL(snapshot.ref);
          
          // Store URL in pictureUrls array
          pictureUrls.push(downloadURL);
        } catch (uploadError) {
          console.error('Error uploading image to Firebase:', uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }
      }

      // Combine product details with image URLs
      const completeProductData = {
        ...productDetails,
        pictures: pictureUrls
      };

      // Make API call with complete product data
      const response = await axios.post(API_URL, completeProductData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { 
          error: error.message,
          details: 'Failed to create product'
        }
      );
    }
  }
);


// Get all products with pagination
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get product by ID
export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Fetch Products by Category
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/products/category/${category}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.error || "Failed to fetch products by category");
      }
    }
  );

// Update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    totalProducts: 0,
    page: 1,
    limit: 5,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle each action's loading, success, and error states
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Product by ID
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p._id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
