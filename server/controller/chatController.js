const Chat = require('../model/chat');

const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort('timestamp');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postMessage = async (req, res) => {
  try {
    const newMessage = new Chat(req.body);
    await newMessage.save();
    res.status(201).send(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendEvents = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendMessages = async () => {
    try {
      const messages = await Chat.find().sort('timestamp');
      res.write(`data: ${JSON.stringify(messages)}\n\n`);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  sendMessages();

  const intervalId = setInterval(sendMessages, 3000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = { getMessages, postMessage, sendEvents };
