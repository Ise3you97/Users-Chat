import React from "react";
import PropTypes from "prop-types";

export var userNameSelect = "";

export const handleClick = (username) => {
  userNameSelect = username;
  console.log(userNameSelect);
};

const MessageItem = ({ username, message, timestamp }) => {
  const onClickHandler = () => handleClick(username);

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

MessageItem.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default MessageItem;
