// Allows to look at a file that has password
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// postgres database
const app = express();
const search = require('./routes/search');
const member = require('./routes/member');
const auth = require('./routes/auth');
const port = process.env.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/search', search);
app.use('/api/member', member);
app.use('/api/auth', auth);

app.listen(port, () => {
  console.log('server has started on port 5000');
});
