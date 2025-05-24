import { useState } from "react";
import { Typography, Paper, TextField, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  // Mock user membership data (you can fetch from backend later)
  const [membership, setMembership] = useState({
    status: "Aktivno", // or "Pauzirano", "Isteklo"
    expires: "2025-12-31",
  });

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("Plaćanje poslano (simulacija)");
    // Here you would send payment info to backend
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>Profil korisnika</Typography>

      <Paper sx={{ padding: "1rem", mb: 4 }}>
        <Typography variant="h6">Osnovni podaci</Typography>
        <Typography>Ime: {user?.name || "Marko Marković"}</Typography>
        <Typography>Email: {user?.email || "marko@example.com"}</Typography>
      </Paper>

      <Paper sx={{ padding: "1rem", mb: 4 }}>
        <Typography variant="h6">Članstvo</Typography>
        <Typography>Status: {membership.status}</Typography>
        <Typography>Vrijedi do: {membership.expires}</Typography>
      </Paper>

      <Button variant="outlined" color="error" onClick={logout}>
        Odjavi se
      </Button>
    </Box>
  );
}
