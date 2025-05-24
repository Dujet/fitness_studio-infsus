import { AppBar, Toolbar, Button, Switch} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const handleLoginToggle = () => {
        setIsLoggedIn((prev) => !prev);
    }
    return (
        <AppBar>
        <Toolbar>
            <Button color="inherit" component={Link} to="/">Početna</Button>
            <Button color="inherit" component={Link} to="/classes">Raspored</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" component={Link} to="/admin/terms">Admin</Button>
            <Switch checked={isLoggedIn} onChange={handleLoginToggle}></Switch>
        </Toolbar>
        </AppBar>
    );
}