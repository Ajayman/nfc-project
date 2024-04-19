'use client'
import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { appBarMenu as pagesMenu } from '../products';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { Drawer } from '@mui/material'
import { FormEvent } from 'react'
import SearchProducts from '../components/SearchProducts'
import Search from '../components/Search'


const settings = ['Profile', 'Account', 'Sign Up', 'Logout'];

function ResponsiveAppBar({children}) {
  const [navMenu, setSetNavMenu] = React.useState(pagesMenu)
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false)

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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <h2>This is a drawer example</h2>
    </Box>
  )

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            <Link href="/">NFC</Link>
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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            {/* <Paper
              component='form'
              elevation={3}
              sx={{ p: '2px 4px', display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Anything Here"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper> */}
           <div>
                <Search />
            </div>
           
            {children}

            <IconButton aria-label='shopping cart' onClick={toggleDrawer(true)} >
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;