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

import io from "socket.io-client";
// import { connect } from 'mongoose'

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000");

const Chat = () => {
  const { selectedContact } = useMyContext();
  const contactName = selectedContact && selectedContact.name;
  const contactImage = selectedContact && selectedContact.image;

  const userid = selectedContact && selectedContact._id;

  const [isUserOnline, setIsUserOnline] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  console.log("🚀 ~ file: Chat.js:29 ~ Chat ~ currentMessage:", currentMessage);
  const [preMessage, setPreMessage] = useState("");
  console.log("🚀 ~ file: Chat.js:31 ~ Chat ~ preMessage:", preMessage);
  const [istyping, setisTyping] = useState(false);

  socket.on("connect", () => {
    setIsConnected(true);
  });
  // useEffect(() => {

  // }, [isConnected]);

  useEffect(() => {
    if (!userid || !selectedContact._id) return;

    const handleConnect = () => {
      console.log("Socket connection established");
      setIsConnected(true);
      socket.emit("join", localStorage.getItem("userId"));
      socket.emit("isonline", selectedContact._id);
    };

    // If not already connected, listen for the connect event
    if (!socket.connected) {
      console.log("Connecting Socket");
      socket.on("connect", handleConnect);
    } else {
      // Already connected, emit immediately
      console.log("Socket already connected");
      setIsConnected(true);
      socket.emit("join", localStorage.getItem("userId"));
      socket.emit("isonline", selectedContact._id);
    }

    // Emit join/isonline again (redundant fallback, safe to keep)
    socket.emit("join", localStorage.getItem("userId"));
    socket.emit("isonline", selectedContact._id);

    // Set up listeners
    socket.on("online", (userId) => {
      console.log("User is online:", userId);
      if (userId === selectedContact._id) {
        setIsUserOnline(true);
      }
    });

    socket.on("offline", (userId) => {
      console.log("User is offline:", userId);
      if (userId === selectedContact._id) {
        setIsUserOnline(false);
      }
    });

    socket.on("istyping", (istyping) => {
      setisTyping(istyping);
    });

    const intervalId = setInterval(() => {
      let istyping = currentMessage !== preMessage;
      setPreMessage(currentMessage);
      socket.emit("ping", istyping);
      if (selectedContact) {
        socket.emit("pong", selectedContact._id);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      socket.off("connect", handleConnect);
      socket.off("online");
      socket.off("offline");
      socket.off("istyping");
    };
  }, [selectedContact._id, userid, currentMessage, preMessage]);

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
                {isUserOnline ? "Online" : "Offline"}
              </p>
            )}
            {selectedContact && (
              <p style={{ color: "white" }}>{istyping ? "istyping" : ""}</p>
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
      {selectedContact && <Input user={userid} mess={setCurrentMessage} />}

      {showAddFriendModal && (
        <Addfriend closeModal={() => setShowAddFriendModal(false)} />
      )}
    </div>
  );
};

export default Chat;
