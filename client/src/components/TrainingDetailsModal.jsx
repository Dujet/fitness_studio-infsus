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

export default function TrainingDetailsModal({ session, onClose }) {
  if (!session) return null;

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

      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          <strong>Opis:</strong> {session.opis_t}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Kapacitet:</strong> {session.kapacitet}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Datum:</strong> {new Date(session.datum).toLocaleDateString("hr-HR")}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Vrijeme početka:</strong> {session.vrijeme_pocetka}
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
    </Dialog>
  );
}
