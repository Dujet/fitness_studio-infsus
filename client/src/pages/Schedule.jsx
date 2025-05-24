import { useEffect, useState } from "react";
import { TextField, MenuItem, Grid, Typography, Button, Paper, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

// Example mock data (simulate fetched from backend)
const MOCK_TERMS = [
    {
        id: 1,
        name: "Pilates",
        date: "2025-05-25T10:00",
        instructor: "Ana",
        type: "Pilates",
        spotsLeft: 4,
    },
    {
        id: 2,
        name: "HIIT",
        date: "2025-05-26T18:00",
        instructor: "Ivan",
        type: "Kondicija",
        spotsLeft: 0,
    },
    {
        id: 3,
        name: "Yoga",
        date: "2025-05-27T09:00",
        instructor: "Ana",
        type: "Pilates",
        spotsLeft: 2,
    },
    {
        id: 4,
        name: "Zumba",
        date: "2025-05-28T17:00",
        instructor: "Ivan",
        type: "Kondicija",
        spotsLeft: 5,
    },
    {
        id: 5,
        name: "Filler 5",
        date: "2025-05-27T09:00",
        instructor: "Ana",
        type: "Pilates",
        spotsLeft: 2,
    },
    {
        id: 6,
        name: "Filler 6",
        date: "2025-05-27T09:00",
        instructor: "Ana",
        type: "Pilates",
        spotsLeft: 2,
    },
    {
        id: 7,
        name: "Filler 7",
        date: "2025-05-27T09:00",
        instructor: "Treći lik",
        type: "Gugu treće",
        spotsLeft: 2,
    },
];

export default function Schedule() {
    const [terms, setTerms] = useState([]);
    const [filter, setFilter] = useState({ type: "", instructor: "", date: "" });
    const { isLoggedIn } = useAuth();
    const instructors = [...new Set(MOCK_TERMS.map(term => term.instructor))];
    const types = [...new Set(MOCK_TERMS.map(term => term.type))];

    useEffect(() => {
        // Simulate fetch from backend
        setTerms(MOCK_TERMS);
    }, []);

    const filtered = terms.filter((term) => {
        return (
            (filter.type === "" || term.type === filter.type) &&
            (filter.instructor === "" || term.instructor === filter.instructor) &&
            (filter.date === "" || term.date.startsWith(filter.date))
        );
    });

    return (
        <div style={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>Raspored grupnih treninga</Typography>

            <Paper elevation={3} sx={{ padding: "1rem", marginBottom: "2rem" }}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            select
                            label="Vrsta treninga"
                            value={filter.type}
                            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="">Sve</MenuItem>
                            {types.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            select
                            label="Instruktor"
                            value={filter.instructor}
                            onChange={(e) => setFilter({ ...filter, instructor: e.target.value })}
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value="">Svi</MenuItem>
                            {instructors.map((instructor) => (
                                <MenuItem key={instructor} value={instructor}>
                                    {instructor}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Datum"
                            InputLabelProps={{ shrink: true }}
                            value={filter.date}
                            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={2}>
                {filtered.length === 0 ? (
                    <Typography>Trenutno nema termina koji odgovaraju filterima.</Typography>
                ) : (
                    filtered.map((term) => (
                        <Grid item xs={12} key={term.id}>
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                }}
                            >
                                <Typography variant="h6">{term.name}</Typography>
                                <Typography>
                                    📅 {new Date(term.date).toLocaleString("hr-HR")}
                                </Typography>
                                <Typography>👤 Instruktor: {term.instructor}</Typography>
                                <Typography>🏷️ Vrsta: {term.type}</Typography>
                                <Typography>
                                    🧍 Slobodna mjesta: {term.spotsLeft > 0 ? term.spotsLeft : "Nema"}
                                </Typography>
                                {isLoggedIn && <Button
                                    variant="contained"
                                    disabled={term.spotsLeft === 0}
                                    sx={{ mt: 1 }}
                                >
                                    Rezerviraj
                                </Button>}
                            </div>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
}
