'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { redirect, useRouter } from 'next/navigation'
import Link from '@mui/material/Link';
import { appBarMenu as pagesMenu } from '../products';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Drawer } from '@mui/material'
import Search from '../components/Search'
import { getCookie } from 'app/actions1/getCookieAction';
import DrawerList from './drawer';
import CartItem from './cartItem';
import {useContext} from "react"
import { UserContext } from 'app/context/user';
// import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'

// const QueryClient = new QueryClient()
const settings = ['Profile', 'Account', 'Sign Up', 'Logout'];

export default function ResponsiveAppBar({ children }) {
  const loggedUser = useContext(UserContext);
  const [navMenu, setSetNavMenu] = React.useState(pagesMenu)
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false)
  const [cookieValue, setCookieValue] = useState("");
  const [cartItem, setCartItem] = useState("");
  useEffect(() => {
    getCookie('Authorization').then(val => setCookieValue(val.value));
  }, "")
  useEffect(()=>{
    const getCartItem = async()=> {
      const res = await CartItem();
      setCartItem(res);
    }
    getCartItem();
  },[])
  console.log(cartItem);
  console.log(loggedUser)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page1) => {
    setAnchorElNav(null);
    router.push(page1.pageUrl)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="Nina-logo.jpg" width="60px" alt="nina-logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link href="/" underline="none" color="white" sx={{ ml: 2 }}>NFC</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navMenu.map((page) => (
                <MenuItem key={page.id} onClick={() => { handleCloseNavMenu(page) }}>
                  <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link href="/">NFC</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navMenu.map((page) => (
              <Button
                key={page.id}
                onClick={() => { handleCloseNavMenu(page) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Search />
            {children}
            <IconButton aria-label='shopping cart' onClick={toggleDrawer(true)} >
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
          <DrawerList cookie={cookieValue} cartItem={cartItem} />
        </Drawer>
      </Container>
    </AppBar>
  );
}
