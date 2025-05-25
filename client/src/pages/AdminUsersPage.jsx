import React, { useEffect, useState } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Select, MenuItem, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form, setForm] = useState({ oib: '', ime: '', prezime: '', email: '', lozinka: '' });
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('/api/trener')
            .then(res => res.json())
            .then(data => setInstructors(data))
            .catch(err => alert('Error fetching instructors: ' + err.message));
    });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/korisnik');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            alert('Error fetching users: ' + err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openAddDialog = () => {
        setEditingUser(null);
        setForm({ username: '', email: '', role: '' });
        setOpenDialog(true);
    };

    const openEditDialog = (user) => {
        setEditingUser(user);
        setForm({ username: user.username, email: user.email, role: user.role });
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            const method = editingUser ? 'PUT' : 'POST';
            const url = editingUser ? `/api/korisnik/${editingUser.oib}` : '/api/korisnik';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
            await fetchUsers();
            closeDialog();
        } catch (err) {
            alert('Failed to save user: ' + err.message);
        }
    };

    const handleDelete = async (user) => {
        if (!window.confirm(`Delete user ${user.ime} ${user.prezime}?`)) return;
        try {
            const res = await fetch(`/api/korisnik/${user.oib}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
            await fetchUsers();
        } catch (err) {
            alert('Failed to delete user: ' + err.message);
        }
    };

    const getUserRole = (oib) => {
        if (instructors.length === 0) {
            return 'Korisnik';
        }
        if (instructors.some(i => i && i.oib === oib)) {
            return 'Instruktor';

            //} else if (adminIds.includes(oib)) {
            //return 'Admin';
        } else {
            return 'Korisnik';
        }
    }

    return (
        <div style={{ padding: 24 }}>
            <Typography variant="h4" gutterBottom>Upravljanje korisnicima</Typography>
            <Button variant="contained" onClick={openAddDialog} sx={{ mb: 2 }}>
                Dodaj novog korisnika
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ime</TableCell>
                            <TableCell>Prezime</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Uloga</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map(user => (
                                <TableRow key={user.oib}>
                                    <TableCell>{user.ime}</TableCell>
                                    <TableCell>{user.prezime}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {getUserRole(user.oib)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => openEditDialog(user)} size="large">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(user)} size="large" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingUser ? 'Ažuriraj podatke' : 'Dodaj novog korisnika'}</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="OIB"
                        name="oib"
                        value={form.oib}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required    
                    />
                    <TextField
                        label="Ime"
                        name="ime"
                        value={form.ime}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Prezime"
                        name="prezime"
                        value={form.prezime}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Lozinka"
                        name="lozinka"
                        type="password"
                        value={form.lozinka}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {/*<Select
                        label="Uloga"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        fullWidth
                        displayEmpty
                        margin="normal"
                        required
                    >
                        <MenuItem value="" disabled>Odaberi ulogu</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="instructor">Instruktor</MenuItem>
                        <MenuItem value="user">Korisnik</MenuItem>
                    </Select>*/}
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {editingUser ? 'Ažuriraj' : 'Dodaj'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
