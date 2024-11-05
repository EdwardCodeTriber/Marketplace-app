import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography, Grid, Snackbar, CircularProgress } from '@mui/material';
import { createProduct } from '../Redux/productSlice';

const AddProducts = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPictures(files.map(file => URL.createObjectURL(file))); // Store image previews
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Start loading
    setLoading(true);

    const formData = {
      name,
      description,
      category,
      price: parseFloat(price),
      pictures
    };

    // Dispatch the action to add the product
    await dispatch(createProduct(formData));

    // Stop loading and show success snackbar
    setLoading(false);
    setSnackbarOpen(true);

    // Reset the form
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setPictures([]);
  };

  // Handle closing of snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom color="black">Add Product</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              fullWidth
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Add Product"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {pictures.length > 0 && (
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
                {pictures.map((picture, index) => (
                  <img
                    key={index}
                    src={picture}
                    alt={`Product Preview ${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </form>
      
      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Product added successfully!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default AddProducts;
