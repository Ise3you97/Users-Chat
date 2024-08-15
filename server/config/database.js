const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGO_URI;

// Función para conectar a la base de datos MongoDB
const connect = () => {
  mongoose.connect(dbURI).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
};

module.exports = { connect };
