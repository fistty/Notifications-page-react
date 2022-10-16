import React from "react";
import "./Header.css";

function Header({ counts, handleClick }) {
  return (
    <header>
      <h1>
        Notifications
        <span className="notif-count">{counts}</span>
      </h1>
      <button onClick={handleClick} className="notif-button">
        Mark all as read
      </button>
    </header>
  );
}

export default Header;
