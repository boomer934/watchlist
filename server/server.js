const express = require('express');
const path = require('path');
const cors = require('cors');
const router_post = require('./Router/post');
const router_get = require('./Router/get');
const router_delete = require('./Router/delete');
const router_put = require('./Router/put');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Montaggio router API (opzionale prefisso /api)
app.use('/', router_post);
app.use('/', router_get);
app.use('/', router_delete);
app.use('/', router_put);

// Servire frontend React dalla dist (compatibile Express 5)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/:path(*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});