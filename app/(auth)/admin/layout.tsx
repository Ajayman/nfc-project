"use client"
// import { Metadata } from "next"
import { AppBar, Box, Button, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import React, { useEffect, useState } from "react";
import { dashboardSignOutAction, getDashboardCookie } from "@app/lib/utils";
// import {InfoIcon,CategoryIcon,AppsIcon} from '@mui/icons-material';
// export const metadata: Metadata = {
//     title: {
//         template: '%s | Authentication',
//         default: 'Auth'
//     },
//     description: 'The NFC Authentication'
// }

export default function accountLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [isLoggedIn, setIsLoggedIn] = useState();
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[{name: 'About', icon:'', link: 'about'}, {name:'Product', icon: '', link: 'product'}, {name: 'Category', icon: '', link: 'category'}].map((link, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Link href={link.link}>{link.name}</Link>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    useEffect(() => {
        const getCartItem = async () => {
            const res = await getDashboardCookie();
            setIsLoggedIn(res)
        }
        getCartItem();
    }, [])
    // const isLoggedIn = getDashboardCookie();
    return (
        <html lang="en">
            <body>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            {
                                isLoggedIn ? 
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}

                                    onClick={toggleDrawer(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                :
                                <IconButton/>
                            }
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Admin Panel
                            </Typography>
                            {
                                !isLoggedIn ?
                                    <Button color="inherit">Login</Button>
                                    :
                                    <Button onClick={async () => { const result = await dashboardSignOutAction() }} color="inherit">Sign Out</Button>
                            }
                        </Toolbar>
                    </AppBar>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Box>
                {children}
            </body>
        </html>
    )
}