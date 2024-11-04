import React from "react";
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <div>
      <Box
        component="footer"
        sx={{
          bgcolor: "grey.900",
          py: 2,
          textAlign: "center",
          color: "grey.400",
        }}
      >
        Footer
      </Box>
    </div>
  );
};

export default Footer;
