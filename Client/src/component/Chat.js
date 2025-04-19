import React from "react";
import cam from "../img/cam.png";
import add from "../img/add.png";
import more from "../img/more.png";
import avtar from "../img/download.png";
import Message from "./Message";
import Input from "./Input";
import { useState, useEffect } from "react";
import Addfriend from "./Addfriend";
import { useMyContext } from "../context/MyContext";

import socket from "../socket";

const Chat = () => {
  const { selectedContact } = useMyContext();
  const contactName = selectedContact && selectedContact.name;
  const contactImage = selectedContact && selectedContact.image;

  const userid = selectedContact && selectedContact._id;

  const [isUserOnline, setIsUserOnline] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  console.log("🚀 ~ Chat ~ isConnected:", isConnected);

  const [istyping, setisTyping] = useState(false);

  socket.on("connect", () => {
    setIsConnected(true);
  });

  useEffect(() => {
    if (!userid || !selectedContact._id) return;

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit("join", localStorage.getItem("userId"));
      socket.emit("isonline", selectedContact._id);
    };

    // If not already connected, listen for the connect event
    if (!socket.connected) {
      socket.on("connect", handleConnect);
    } else {
      setIsConnected(true);
      socket.emit("join", localStorage.getItem("userId"));
      socket.emit("isonline", selectedContact._id);
    }

    // Emit join/isonline again (redundant fallback, safe to keep)
    socket.emit("join", localStorage.getItem("userId"));
    socket.emit("isonline", selectedContact._id);

    // Set up listeners
    socket.on("online", (userId) => {
      if (userId === selectedContact._id) {
        setIsUserOnline(true);
      }
    });

    socket.on("offline", (userId) => {
      if (userId === selectedContact._id) {
        setIsUserOnline(false);
      }
    });

    socket.on("istyping", ({ isTyping, senderId }) => {
      console.log("🚀 ~ socket.on ~ senderId:", senderId);
      console.log("🚀 ~ socket.on ~ status:", isTyping);
      if (senderId === selectedContact._id) {
        setisTyping(isTyping);
      }
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("online");
      socket.off("offline");
      socket.off("istyping");
    };
  }, [selectedContact._id, userid]);

  const [showAddFriendModal, setShowAddFriendModal] = useState(false);

  const handleAddFriend = () => {
    setShowAddFriendModal(true);
  };

  return (
    <div className="chat">
      <div className="chatinfo">
        <div className="userdetails">
          <div className="chatImage">
            {selectedContact && <img src={contactImage} alt={avtar} />}
          </div>
          <div className="chattitle">
            <span> {contactName}</span>
            {selectedContact && (
              <p style={{ color: "white" }}>
                {istyping ? "istyping" : isUserOnline ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>
        <div className="chatIcons">
          {selectedContact && <img src={cam} alt="" />}
          <img src={add} alt="" onClick={handleAddFriend} />
          <img src={more} alt="" />
        </div>
      </div>

      {selectedContact && <Message />}
      {selectedContact && <Input user={userid} />}

      {showAddFriendModal && (
        <Addfriend closeModal={() => setShowAddFriendModal(false)} />
      )}
    </div>
  );
};

export default Chat;
