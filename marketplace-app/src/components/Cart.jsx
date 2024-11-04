import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia, IconButton, Box } from '@mui/material';
import { Search, ShoppingCart, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Cart() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box sx={{ backgroundColor: '#6e6e6e', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          {/* Back Button */}
          <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
            <span style={{ color: 'lime' }}>Mlab</span><span style={{ color: 'red' }}>marketplace</span>
          </Typography>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Title */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
          Your Cart!
        </Typography>
      </Container>

      {/* Product Grid */}
      <Container>
        <Grid container spacing={3}>
          {Array.from(Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ backgroundColor: '#ccc' }}>
                <CardMedia
                  component="img"
                  height="140"
                  sx={{ backgroundColor: '#e0e0e0' }}
                />
                <CardContent>
                  <Typography variant="h6">Product title</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description:
                  </Typography>
                  <Typography variant="body1">Price:</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Cart;
