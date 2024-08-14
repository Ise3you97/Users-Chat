const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoute');
const dbConfig = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
dbConfig.connect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/messages', chatRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
