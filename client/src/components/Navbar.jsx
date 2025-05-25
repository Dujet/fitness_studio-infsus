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

    const handleAddTraining = async () => {
        try {
            const response = await fetch('/api/termin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_t: 1,
                    datum: '2025-06-07',
                    vrijeme: '10:00:00'
                })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            alert("POST successfuly, created termin with ID: " + data.id);
        } catch (err) {
            alert("POST failed: " + err.message);
        }
    };

    return (
        <AppBar>
        <Toolbar>
            <Button color="inherit" component={Link} to="/">Početna</Button>
            <Button color="inherit" component={Link} to="/classes">Raspored</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" component={Link} to="/admin">Admin</Button>
            <Switch checked={isLoggedIn} onChange={handleLoginToggle}></Switch>
            <Button color="inherit" onClick={handleAddTraining}>Add training session (test)</Button>
        </Toolbar>
        </AppBar>
    );
}