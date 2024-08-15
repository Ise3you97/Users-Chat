import React from "react";
import PropTypes from "prop-types";

export var userNameSelect = "";

// Función para manejar el clic en un mensaje y actualizar el nombre de usuario seleccionado
export const handleClick = (username) => {
  userNameSelect = username;
  console.log(userNameSelect);
};

// Componente que representa un ítem de mensaje en el chat
const MessageItem = ({ username, message, timestamp }) => {
  // Función que maneja el clic en el mensaje y actualiza el nombre de usuario seleccionado
  const onClickHandler = () => handleClick(username);

  // Formatea la marca de tiempo del mensaje a una cadena de hora y minuto
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="message-item" onClick={onClickHandler}>
      <div className="buble-container">
        <strong>{username}:</strong>
        <p>{message}</p>
        <span className="timestamp">{formattedTime}</span>
      </div>
    </div>
  );
};

// Define los tipos de las props que el componente espera recibir
MessageItem.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default MessageItem;
