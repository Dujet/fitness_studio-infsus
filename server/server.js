const express = require('express');
const app = express();

const treningRoutes = require('./routes/treningRoutes');
const terminRoutes = require('./routes/terminRoutes');
const korisnikRoutes = require('./routes/korisnikRoutes');
const profilRoutes = require('./routes/profilRoutes');
const trenerRoutes = require('./routes/trenerRoutes');

app.use(express.json());

app.use('/api/trener', trenerRoutes);
app.use('/api/profil', profilRoutes);
app.use('/api/trening', treningRoutes);
app.use('/api/termin', terminRoutes);
app.use('/api/korisnik', korisnikRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
