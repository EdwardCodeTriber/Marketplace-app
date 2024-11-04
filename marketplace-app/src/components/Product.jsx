import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Product = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Browse products...
      </Typography>
      <Grid container spacing={4}>
        {/* Example Product Cards */}
        {[...Array(8)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "grey.800", color: "white" }}>
              <CardMedia
                sx={{ height: 140, bgcolor: "grey.700" }}
                title="Product image"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Product title
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
    </Container>
  );
};

export default Product;
