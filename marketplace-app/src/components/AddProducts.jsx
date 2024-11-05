import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
  CircularProgress
} from '@mui/material';
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
    setPictures(files.map((file) => URL.createObjectURL(file))); // Store image previews
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name,
      description,
      category,
      price: parseFloat(price),
      pictures
    };

    await dispatch(createProduct(formData));
    setLoading(false);
    setSnackbarOpen(true);

    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setPictures([]);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'grey.900',
        color: 'white',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          bgcolor: 'grey.800',
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom color="lime">
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Product Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'grey.300' } }}
            sx={{
              bgcolor: 'grey.700',
              borderRadius: 1,
              input: { color: 'white' },
            }}
          />
          <TextField
            variant="outlined"
            label="Category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'grey.300' } }}
            sx={{
              bgcolor: 'grey.700',
              borderRadius: 1,
              input: { color: 'white' },
            }}
          />
          <TextField
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'grey.300' } }}
            sx={{
              bgcolor: 'grey.700',
              borderRadius: 1,
              input: { color: 'white' },
            }}
          />
          <TextField
            variant="outlined"
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: 'grey.300' } }}
            sx={{
              bgcolor: 'grey.700',
              borderRadius: 1,
              input: { color: 'white' },
            }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: 'lime',
              color: 'black',
              '&:hover': { bgcolor: 'limegreen' },
            }}
          >
            Upload Images
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          <Grid container justifyContent="center" spacing={1} sx={{ mt: 2 }}>
            {pictures.map((picture, index) => (
              <img
                key={index}
                src={picture}
                alt={`Product Preview ${index}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: 'lime',
              color: 'black',
              '&:hover': { bgcolor: 'limegreen' },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Product'}
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Product added successfully!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </Box>
  );
};

export default AddProducts;
