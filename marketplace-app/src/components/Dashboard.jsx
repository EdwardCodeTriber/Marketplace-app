import { useState,  } from 'react';
import {useNavigate} from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Product from './Product';
import Footer from './Footer';

function Marketplace() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const cart = ()=>{
    navigate("/Cart")
  }
  const category = ()=>{
    navigate("/Category")
  }

  const drawerContent = (
    <Box
      sx={{ width: 250, bgcolor: 'grey.900', color: 'grey.100', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ m: 2, fontWeight: 'bold' }}>
        Menu
      </Typography>
      <Divider sx={{ bgcolor: 'grey.700' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={category}>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'grey.100', minHeight: '100vh', }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: 'grey.900' }}>
        <Toolbar>
          {/* Hamburger Icon */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'green' }}>
            mLab <span style={{ color: 'white' }}>Marketplace</span>
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="cart" onClick={cart}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Hamburger Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Product />

      {/* Footer */}
      <div>
        <Footer />
      </div>
      
    </Box>
  );
}

export default Marketplace;
