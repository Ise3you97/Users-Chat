// src/components/ChatContainer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageItem from './MessageItem';
import MessageForm from './MessageForm';
import '../Css/ChatContainer.css';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

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

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axios.get('https://backen-for-chat.onrender.com/messages');
      setMessages(result.data);
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (newMessage) => {
    const usernamePattern = /^[A-Z][^\s]*$/;
    if (!usernamePattern.test(newMessage.username)) {
      alert('Username must start with an uppercase letter and cannot contain spaces.');
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
