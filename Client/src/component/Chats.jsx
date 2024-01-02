import React from "react";
import ChatsItem from "./ChatsItem";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api/v1";

const Chats = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const initialcontact = [];
  const [contact, setContact] = useState(initialcontact);

  const { setSelectedContact, isAddUser, lastMessage } = useMyContext();
  console.log("🚀 ~ file: Chats.jsx:18 ~ Chats ~ lastMessage:", lastMessage)

  const getContact = async () => {
    const response = await axios.get(`${BASE_URL}/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setContact(response.data.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      getContact();
    } else {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    getContact();
  }, [isAddUser, lastMessage]);

  return (
    <div className="chats">
      <div className="userchat">
        {contact.map((item) => {
          const user = item.users.filter((user) => {
            return user._id !== userId;
          });

          const contactLastMessage = lastMessage && lastMessage.to === user[0]._id
            ? lastMessage.message
            : null;

          return (
            <ChatsItem
              key={user[0]._id}
              names={user[0].name}
              images={user[0].image}
              onClick={() => setSelectedContact(user[0])}
              lastMessage={ contactLastMessage}
              />
          );
        })}
      </div>
    </div>
  );
};

export default Chats;
