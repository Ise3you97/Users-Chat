const mongoose = require("mongoose");

// Define el esquema para los mensajes del chat
const chatSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 172800 //2 dias
  },
});

const Chat = mongoose.model("Chat", chatSchema, 'chats');

module.exports = Chat;
