import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { IconButton, Grid, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "grey.400",
        py: 4,
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom color="white">
              About Us
            </Typography>
            <Typography variant="body2">
              We are a company dedicated to providing the best products to our customers.
              Our mission is to deliver quality and value.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom color="white">
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ display: "block" }}>
              Home
            </Link>
            <Link href="/products" color="inherit" underline="hover" sx={{ display: "block" }}>
              Products
            </Link>
            <Link href="/about" color="inherit" underline="hover" sx={{ display: "block" }}>
              About
            </Link>
            <Link href="/contact" color="inherit" underline="hover" sx={{ display: "block" }}>
              Contact
            </Link>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom color="white">
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: support@company.com
            </Typography>
            <Typography variant="body2">
              Phone: +123 456 7890
            </Typography>
            <Box mt={1}>
              <IconButton color="inherit" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} Codetriber. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
