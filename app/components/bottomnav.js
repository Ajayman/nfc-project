'use client'
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NotificationIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import CartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';

export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState('home');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Home"
                value="home"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                label="Message"
                value="message"
                icon={<MessageIcon />}
            />
            <BottomNavigationAction
                label="Cart"
                value="cart"
                icon={<CartIcon />}
            />
            <BottomNavigationAction label="Notification" value="notification" icon={<NotificationIcon />} />
        </BottomNavigation>
    );
}