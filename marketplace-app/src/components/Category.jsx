import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
  Box,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { Search, ShoppingCart, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../Redux/productSlice";

// eslint-disable-next-line react/prop-types
const Category = ({ category }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Go back to the previous page
  };
  const cart = ()=>{
    navigate("/Cart")
  }

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ backgroundColor: "#6e6e6e", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#333" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            aria-label="back"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
            <span style={{ color: "lime" }}>Mlab</span>
            <span style={{ color: "red" }}>marketplace</span>
          </Typography>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit" onClick={cart}>
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Title */}
      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          Categories
        </Typography>
      </Container>

      {/* Products Grid */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ bgcolor: "grey.800", color: "white" }}>
                <CardMedia
                  component="img"
                  image={product.pictures[0]}
                  alt={product.category}
                  sx={{ height: 140 }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.category}
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    {product.category}
                  </Typography>
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
};

export default Category;
