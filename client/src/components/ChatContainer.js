import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageItem from './MessageItem';
import MessageForm from './MessageForm';
import '../Css/ChatContainer.css';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  // Función para formatear el texto del mensaje, convirtiendo URLs en enlaces clicables
  const formatMessage = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.split(urlPattern).map((part, index) =>
      urlPattern.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  // UseEffect para cargar los mensajes al montar el componente y para actualizarlos periódicamente
  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axios.get('https://backen-for-chat.onrender.com/messages');
      setMessages(result.data);
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Función para manejar el envío de un nuevo mensaje
  const handleSubmit = async (newMessage) => {
    const usernamePattern = /^[A-Z][^\s]*$/;
    if (!usernamePattern.test(newMessage.username)) {
      alert('El nombre de usuario debe comenzar con una letra mayúscula y no puede contener espacios.');
      return;
    }

    await axios.post('https://backen-for-chat.onrender.com/messages', newMessage);
    setMessage('');
  };

  return (
    <div className="chat-container" style={{ backgroundColor }}>
      <h1>Chat</h1>
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            username={msg.username}
            message={formatMessage(msg.message)}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
      <MessageForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatContainer;
