import React from "react";
import MeassageItem from "./MeassageItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMyContext } from "../context/MyContext";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api/v1";

const calculateTimeDifference = (createdAt) => {
  const now = new Date();
  const createdTime = new Date(createdAt);
  const diffInMilliseconds = now - createdTime;

  // Convert the time difference to seconds, minutes, or hours as needed
  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "JUST NOW";
  } else if (minutes < 60) {
    return `${minutes} mins ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} mon ago`;
  } else {
    return `${years} yrs ago`;
  }
};

const Message = () => {
  const { selectedContact } = useMyContext();
  const userId = localStorage.getItem("userId");


  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const initialmeassage = [];
  const [meassagecontent, setMeassagecontent] = useState(initialmeassage);

  const getMeassages = async () => {
    const response = await axios.get(`${BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        to: selectedContact._id, // Send the selected contact ID to the server
      },
    });
    if (response.status === 200) {

      setMeassagecontent(response.data.data.data);
      

      

    }
  };

  useEffect(() => {
    if (token) {
      getMeassages(); 
      const intervalId = setInterval(() => {
        getMeassages(); // Fetch messages every 1ss
      }, 1000); // 1 second

      return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts
      };
    } else {
      navigate("/");
    }
  }, [token, selectedContact, navigate]);

  return (
    <div className="meassage">
      {Array.isArray(meassagecontent) && meassagecontent.length > 0 ? (
        meassagecontent.map((item) => {
          return (
            <MeassageItem
              key={item._id}
              message={item.message}
              userImages={
                item.self.image
              }
              color={item.self._id === userId ? true : false}
              timeDifference={calculateTimeDifference(item.createdAt)}
            />
          );
        })
      ) : (
        <p className="conversation">Start your conversation!</p>
      )}
    </div>
  );
};

export default Message;
