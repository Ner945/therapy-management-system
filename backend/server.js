const express = require('express');
const cors = require('cors');
require('dotenv').config();

const therapistRoutes = require('./routes/TherapistRoutes');
const clientRoutes = require('./routes/ClientRoutes');
const sessionRoutes = require('./routes/SessionRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/therapists', therapistRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/sessions', sessionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
