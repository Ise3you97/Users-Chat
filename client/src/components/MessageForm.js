import React, { useState, useEffect } from 'react';
import { userNameSelect, handleClick } from './MessageItem';
import '../Css/MessageForm.css';

const MessageForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  // UseEffect que actualiza el mensaje con el nombre de usuario seleccionado
  useEffect(() => {
    if (userNameSelect) {
      setMessage(`${userNameSelect} : `);
    }
  }, [userNameSelect]);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && message) {
      onSubmit({ username, message });
      setMessage('');
      setIsHidden(true);
    }
  };

  return (
    <div className={`form-container ${isHidden ? 'hidden' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje"
            required
          />
        </div>
        <button onClick={() => handleClick('')} type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default MessageForm;
