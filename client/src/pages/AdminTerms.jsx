import { useState } from "react";
import {
  Typography, TextField, MenuItem, Button, Grid,
  Paper, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

// Mock instructors and terms
const INSTRUCTORS = ["Ana", "Ivan"];
const INITIAL_TERMS = [
  { id: 1, name: "Pilates", date: "2025-06-01T10:00", instructor: "Ana", type: "Pilates", spotsLeft: 5 },
  { id: 2, name: "HIIT", date: "2025-06-02T18:00", instructor: "Ivan", type: "Kondicija", spotsLeft: 3 },
];

export default function AdminTerms() {
  const [terms, setTerms] = useState(INITIAL_TERMS);
  const [form, setForm] = useState({ id: null, name: "", date: "", instructor: "", type: "", spotsLeft: "" });
  const [error, setError] = useState("");

  const clearForm = () => {
    setForm({ id: null, name: "", date: "", instructor: "", type: "", spotsLeft: "" });
    setError("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, date, instructor, type, spotsLeft } = form;
    const now = new Date();
    const termDate = new Date(date);

    // validation
    if (!name || !date || !instructor || !type || !spotsLeft) {
      return setError("Sva polja su obavezna.");
    }
    if (termDate <= now) {
      return setError("Datum mora biti u budućnosti.");
    }
    if (Number(spotsLeft) <= 0) {
      return setError("Broj slobodnih mjesta mora biti veći od 0.");
    }

    if (form.id) {
      // Update
      setTerms((prev) => prev.map((t) => (t.id === form.id ? { ...form } : t)));
    } else {
      // Create
      const newTerm = { ...form, id: Date.now() };
      setTerms((prev) => [...prev, newTerm]);
    }

    setForm({ id: null, name: "", date: "", instructor: "", type: "", spotsLeft: "" });
  };

  const handleEdit = (term) => {
    setForm(term);
  };

  const handleDelete = (id) => {
    setTerms((prev) => prev.filter((t) => t.id !== id));
  };
// TODO: make this more similar to the master detail crud example
  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>Upravljanje terminima</Typography>

      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Naziv" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth type="datetime-local" label="Datum" InputLabelProps={{ shrink: true }} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField select fullWidth label="Instruktor" value={form.instructor} 
              onChange={(e) => setForm({ ...form, instructor: e.target.value })}
              sx={{ minWidth: 120 }}>
                {INSTRUCTORS.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Vrsta" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth type="number" label="Slobodna mjesta" value={form.spotsLeft} onChange={(e) => setForm({ ...form, spotsLeft: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
              <Button type="submit" variant="contained" sx={{ minWidth: 100 }}>
                {form.id ? "Ažuriraj" : "Dodaj"}
              </Button>
              {form.id && <Button variant="outlined" color="error" onClick={clearForm} sx={{ ml: 2 }} >Otkaži</Button>}
            </Grid>
          </Grid>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </form>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Naziv</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Instruktor</TableCell>
              <TableCell>Vrsta</TableCell>
              <TableCell>Mjesta</TableCell>
              <TableCell>Akcije</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {terms.map((term) => (
              <TableRow key={term.id}>
                <TableCell>{term.name}</TableCell>
                <TableCell>{new Date(term.date).toLocaleString("hr-HR")}</TableCell>
                <TableCell>{term.instructor}</TableCell>
                <TableCell>{term.type}</TableCell>
                <TableCell>{term.spotsLeft}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(term)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(term.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
