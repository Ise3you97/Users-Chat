const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 3600
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
