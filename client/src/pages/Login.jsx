import { TextField, Button, Typography, Box, Container } from "@mui/material";

export default function Login() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Username" fullWidth sx={{ mb: 2 }} />
      <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained">Login</Button>
    </Box>
  );
}
