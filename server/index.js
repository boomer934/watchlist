const express = require('express');
const path = require('path');
const cors = require('cors');
const { executeQuery } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API esempio
app.get('/api/test', async (req, res) => {
  try {
    const result = await executeQuery('SELECT NOW() AS now');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servire frontend React Vite
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su port ${PORT}`);
});
