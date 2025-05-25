import React from 'react';
import { Typography, Button, Box } from '@mui/material';

export default function TrainingCard({ term, onDetailsClick }) {

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
        📅 {new Date(term.datum).toLocaleDateString("hr-HR") + " " + term.vrijeme_pocetka}
      </Typography>
      <Typography>
        🧍 Kapacitet: {term.kapacitet}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={() => onDetailsClick(term)}
      >
        Detalji
      </Button>
    </Box>
  );
}
