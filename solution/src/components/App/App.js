import { useEffect, useState } from "react";
import Header from "../Header/Header";
import userData from "../../UserData";
import ReactionNotification from "../ReactionNotification/ReactionNotification";
import FollowNotification from "../FollowNotification/FollowNotification";
import GroupNotification from "../GroupNotification/GroupNotification";
import "./App.css";
import PrivateNotification from "../PrivateNotification/PrivateNotification";
import PictureCommentNotification from "../PictureCommentNotification/PictureCommentNotification";
import Footer from "./Footer/Footer";

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
    }, 6000);
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm97.9-320l-17 17-47 47 47 47 17 17L320 353.9l-17-17-47-47-47 47-17 17L158.1 320l17-17 47-47-47-47-17-17L192 158.1l17 17 47 47 47-47 17-17L353.9 192z" />
              </svg>
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
      <Footer />
    </>
  );
}

export default App;
