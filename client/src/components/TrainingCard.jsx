import React from 'react';
import { Typography, Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TrainingCard({ term, onDetailsClick, onDelete }) {
  if (!term) {
    return (
      <Box sx={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "0.5rem" }}>
        <Typography variant="h6">Nema podataka o terminu</Typography>
      </Box>
    );
  }

  const handleDeleteTerm = async (id) => {
    try {
      const response = await fetch(`/api/termin/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      onDelete(id);
    } catch (error) {
      console.error("Error deleting term:", error);
      alert("Greška prilikom brisanja termina. Pokušajte ponovno.");
    } 
  }

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <Typography variant="h6">{term.naziv_t}</Typography>
      <Typography>
        Instruktor: {term.ime} {term.prezime}
      </Typography>
      <Typography>
        📅 {new Date(term.datum).toLocaleDateString("hr-HR") + " " + term.vrijeme}
      </Typography>
      <Typography>
        🧍 Kapacitet: {term.kapacitet}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={() => onDetailsClick(term)}
      >
        Uredi
      </Button>
      <IconButton
        aria-label='Delete'
        sx={{ ml: 1 }}
        onClick={() => {
          if (window.confirm("Jeste li sigurni da želite obrisati ovaj termin?")) {
            handleDeleteTerm(term.id);
            alert("Termin " + term.id + " obrisan.");
          }
        }}
      >
        <DeleteIcon fontsize="inherit" />
      </IconButton>
    </Box>
  );
}
