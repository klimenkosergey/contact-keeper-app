const express = require('express');
const path = require('path');

const app = express();

const initDB = require('./config/db');

// Init Middleware
app.use(express.json());

// Connect Database
initDB();

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));

// Add build resources
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

// If in prod - serve index.html from build dir for all requests
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
