import React from "react";
import { unreadChecker } from "../../unreadChecker";

function PrivateNotification({ user, toggleRead }) {
  return (
    <div
      className={"notif-item" + unreadChecker(user)}
      onDoubleClick={toggleRead}>
      <div className="notif-item-profile-img-container">
        <img
          src={require("../../images/" + user.profileImage + ".webp")}
          alt="dp"
        />
      </div>
      <div className="text-container">
        <p className="profile-name">{user.name}</p>
        <p className="notif-type">sent you a private message</p>
        {user.unread ? (
          <i className="red-dot">
            <svg
              style={{ fill: "red" }}
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 512 512">
              <title>ionicons-v5-q</title>
              <path d="M256,464C141.31,464,48,370.69,48,256S141.31,48,256,48s208,93.31,208,208S370.69,464,256,464Z"></path>
            </svg>
          </i>
        ) : null}
        <div className="notif-time">{user.time}</div>
        <div className="private-message-container">
          <p className="notif-private-message">
            Hello, thanks for setting up the Chess Club. I've been a member for
            a few weeks now and I'm already having lots of fun and improving my
            game.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivateNotification;
