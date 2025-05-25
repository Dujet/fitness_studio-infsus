import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Link,
  Box
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { TextField, MenuItem, Button, DialogActions } from "@mui/material";


export default function TrainingDetailsModal({ session, onClose, trainings, onUpdate, open }) {
  if (!session) return null;

  const [formData, setFormData] = useState({
    id_t: '',
    datum: '',
    vrijeme: '',
  })

  useEffect(() => {
    if (session) {
      setFormData({
        id_t: session.id_t || '',
        datum: session.datum || '',
        vrijeme: session.vrijeme || '',
      })
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/termin/${session.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Greška pri ažuriranju termina: ${response.statusText}`);
      alert("Termin ažuriran uspješno!");
      const updatedSession = await response.json();
      console.log("Updated session:", updatedSession);
      onUpdate(updatedSession);
      onClose();
    } catch (err) {
      alert("Greška pri ažuriranju termina: " + err.message);
    }
  }

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return ''; // Invalid date
    return date.toISOString().split('T')[0];
  }

  const formatTimeHHmm = (timeStr) => {
    if (!timeStr) return "";
    return timeStr.split(':').slice(0, 2).join(':');
  }


  return (
    <Dialog open={Boolean(session)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {session.naziv_t}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <TextField
        select
        label="Trening"
        name="id_t"
        value={formData.id_t}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{ width: '300px', ml:1 }}
      >
        {trainings.map((t) => (
          <MenuItem key={t.id_t} value={t.id_t}>
            {t.naziv_t}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Datum"
        name="datum"
        type="date"
        value={formatDate(formData.datum)}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        sx={{ width: '150px', ml:1 }}
      />

      <TextField
        label="Vrijeme početka"
        name="vrijeme"
        type="time"
        value={formatTimeHHmm(formData.vrijeme)}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        sx={{ width: '150px', ml:1 }}
      />

      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          <strong>Opis:</strong> {session.opis_t}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Kapacitet:</strong> {session.kapacitet}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Trener:</strong> {session.ime} {session.prezime}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong>{" "}
          <Link href={`mailto:${session.email}`} underline="hover">
            {session.email}
          </Link>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Zatvori</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Ažuriraj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
