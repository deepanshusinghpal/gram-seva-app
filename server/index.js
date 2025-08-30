// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());

// THIS LINE IS CRUCIAL AND MUST BE HERE ▼▼▼
// It tells Express to parse incoming JSON requests, making `req.body` available.
app.use(express.json());

// THIS LINE TO SERVE STATIC FILES (IMAGES) ▼▼▼
app.use(express.static('public'));

// Routes (must come AFTER the middleware)
app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`✅ Backend server running on http://localhost:${port}`);
});