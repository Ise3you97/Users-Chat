const Chat = require('../model/chat');

// Función para obtener todos los mensajes del chat
const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort('timestamp');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Función para enviar un nuevo mensaje al chat
const postMessage = async (req, res) => {
  try {
    const newMessage = new Chat(req.body);
    await newMessage.save();
    res.status(201).send(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Función para enviar eventos en tiempo real a través de Server-Sent Events (SSE)
const sendEvents = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Función para enviar los mensajes más recientes al cliente
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

    // Limpia el intervalo y cierra la conexión cuando el cliente se desconecta
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = { getMessages, postMessage, sendEvents };
