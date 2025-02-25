import { useState, useEffect } from "react";
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
import { Box, CircularProgress } from "@mui/material/";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/productSlice";

const Product = () => {
  // States
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Hooks
  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 5 }));
  }, [dispatch]);

  // Functions
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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <Card
                onClick={() =>
                  handleOpenDialog({
                    pictures: product.pictures,
                    title: product.name,
                    description: product.description,
                    price: product.price,
                  })
                }
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
                  component="img"
                  sx={{ height: 140, bgcolor: "grey.700" }}
                  image={product.pictures[0] || "/placeholder.png"}
                  title={product.name || "Product image"}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name || "Product Title"}
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    {product.description || "No description available"}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    R {product.price || "Price not available"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog for Product Details */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            // This targets the paper component of the Dialog
            backgroundColor: "#333333", // Dark grey background
            color: "white", // Changed text color to white for better contrast
          },
        }}
      >
        <DialogTitle>{selectedProduct?.title}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {selectedProduct?.pictures?.map((pic, index) => (
              <Box
                key={index}
                component="img"
                src={pic || "/placeholder.png"}
                alt={`${selectedProduct?.title} - ${index + 1}`}
                sx={{
                  width: { xs: "100%", md: "300px" },
                  height: "auto",
                  borderRadius: 2,
                }}
              />
            ))}
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, color: "white" }}>
                Description: {selectedProduct?.description}
              </Typography>
              <Typography variant="h6" color="primary" sx={{color:"white"}}>
                Price: R {selectedProduct?.price}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Product;
