import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Browse products...
      </Typography>
      <Grid container spacing={4}>
        {/* Example Product Cards */}
        {[...Array(8)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              onClick={() => handleOpenDialog({ title: `Product ${index + 1}`, description: "Product description", price: "$99" })}
              sx={{
                bgcolor: "grey.800",
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <CardMedia
                sx={{ height: 140, bgcolor: "grey.700" }}
                title="Product image"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Product title {index + 1}
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Description
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Price
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Product Details */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedProduct?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            {selectedProduct?.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {selectedProduct?.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Product;
