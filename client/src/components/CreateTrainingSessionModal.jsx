import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

export default function CreateTrainingSessionModal({ open, onClose, onCreate, trainings }) {
  const [newSession, setNewSession] = React.useState({
    id_t: '',
    datum: '',
    vrijeme: ''
  });

  const handleClose = () => {
    onClose();
    setNewSession({
      id_t: '',
      datum: '',
      vrijeme: ''
    });
  }

  const handleChange = (e) => {
    setNewSession({
      ...newSession,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async () => {
        try {
            const response = await fetch('/api/termin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSession)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            alert("POST successfuly, created termin with ID: " + data.id);
            onCreate();
            handleClose();
        } catch (err) {
            alert("POST failed: " + err.message);
        }  
    };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Dodaj novi termin</DialogTitle>
      <DialogContent>
        <TextField
          select
          margin="dense"
          label="Trening"
          name="id_t"
          value={newSession.id_t}
          onChange={handleChange}
          fullWidth
          SelectProps={{
            native: true,
          }}
          InputLabelProps={{ shrink: true }}
          required
        >
          <option value="">Odaberite trening</option>
          {trainings.map((training) => (
            <option key={training.id_t} value={training.id_t}>
              {training.naziv_t}
            </option>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Datum"
          name="datum"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newSession.datum}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="dense"
          label="Vrijeme početka"
          name="vrijeme"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={newSession.vrijeme}
          onChange={handleChange}
          fullWidth
          required
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Odustani</Button>
        <Button onClick={handleSubmit} variant="contained">
          Spremi
        </Button>
      </DialogActions>
    </Dialog>
  )
}