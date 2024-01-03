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
  


  const { setSelectedContact, isAddUser } = useMyContext();



  const getLastMessage = (messageRec, messageSen) => {
    if (!messageRec && !messageSen) {
      return null;
    }

    if (!messageRec) {
      return messageSen;
    }

    if (!messageSen) {
      return messageRec;
    }

    // Compare timestamps or any other criteria that define the order
    const timestampRec = new Date(messageRec.createdAt).getTime();
    const timestampSen = new Date(messageSen.createdAt).getTime();

    return timestampRec > timestampSen ? messageRec : messageSen;
  };





  const getContact = async () => {
    const response = await axios.get(`${BASE_URL}/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("🚀 ~ file: Chats.jsx:31 ~ getContact ~ response:", response.data.data)
      setContact(response.data.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      getContact();
      const intervalId = setInterval(() => {
        getContact();
      }, 1000);
      return ()=>{
        clearInterval(intervalId)
      }
    } else {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    getContact();
  }, [isAddUser]);

  return (
    <div className="chats">
      <div className="userchat">
        
        {contact.map((item) => {


          const lastMessageRec = item.users[1].message;

        const lastMessageSen = item.users[0].message;

        const latestMessage = getLastMessage(lastMessageRec, lastMessageSen);


          const user = item.users.filter((user) => {
            return user._id !== userId;
          });
          console.log("🚀 ~ file: Chats.jsx:63 ~ {contact.map ~ lastMessageText:", user)
          

          

          return (
            
            <ChatsItem
              key={user[0]._id}
              names={user[0].name}
              images={user[0].image}
              onClick={() => setSelectedContact(user[0])}
              // lastMessage={lastMessageText}
              lastMessage={latestMessage ? latestMessage.message : null}

              />
              );
        })}
      </div>
    </div>
  );
};

export default Chats;
