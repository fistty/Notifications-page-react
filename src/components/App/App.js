import { useEffect, useState } from "react";
import Header from "../Header/Header";
import userData from "../../UserData";
import ReactionNotification from "../ReactionNotification/ReactionNotification";
import FollowNotification from "../FollowNotification/FollowNotification";
import GroupNotification from "../GroupNotification/GroupNotification";
import "./App.css";
import PrivateNotification from "../PrivateNotification/PrivateNotification";
import PictureCommentNotification from "../PictureCommentNotification/PictureCommentNotification";

function App() {
  const [count, setCount] = useState(0);
  const [toggleRender, setToggleRender] = useState(true);
  const [guideShow, setGuideShow] = useState(true);
  const handleMarkClick = () => {
    userData.map((items) => {
      items.unread = false;
    });
    setToggleRender((prev) => !prev);
  };

  const toggleRead = (user) => {
    setToggleRender((prev) => !prev);
    user.unread = !user.unread;
  };

  useEffect(() => {
    let unreadNum = 0;
    userData.reduce((prev, curr) => {
      if (curr.unread) {
        unreadNum = unreadNum + 1;
        setCount(unreadNum);
      }
    }, []);
    if (unreadNum === 0) {
      setCount(0);
    }
    console.log(unreadNum);
  }, [toggleRender]);

  useEffect(() => {
    setTimeout(() => {
      setGuideShow(false)
    }, 10000);
  });

  return (
    <>
      <Header counts={count} handleClick={handleMarkClick} />

      <main>
        {guideShow ? (
          <p className="double-click">
            DOUBLE CLICK ON NOTIFICATION ITEM TO MARK AS UNREAD
            <button
              className="double-click-x"
              onClick={() => {
                setGuideShow(false);
              }}>
              X
            </button>
          </p>
        ) : null}
        {userData.map((items) => {
          if (items.notifType === "REACTION") {
            return (
              <ReactionNotification
                key={items.id}
                user={items}
                toggleRead={() => toggleRead(items)}
              />
            );
          } else if (items.notifType === "FOLLOW") {
            return (
              <FollowNotification
                key={items.id}
                user={items}
                toggleRead={() => toggleRead(items)}
              />
            );
          } else if (items.notifType === "GROUP") {
            return (
              <GroupNotification
                key={items.id}
                user={items}
                toggleRead={() => toggleRead(items)}
              />
            );
          } else if (items.notifType === "PRIVATE_MESSAGE") {
            return (
              <PrivateNotification
                key={items.id}
                user={items}
                toggleRead={() => toggleRead(items)}
              />
            );
          } else if (items.notifType === "PICTURE_COMMENT") {
            return (
              <PictureCommentNotification
                key={items.id}
                user={items}
                toggleRead={() => toggleRead(items)}
              />
            );
          } else {
            return null;
          }
        })}
      </main>
    </>
  );
}

export default App;
