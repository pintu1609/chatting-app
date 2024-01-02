// MyContext.js
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState("");
  const [userImage, setUserImage] = useState(""); // Add userImage state
  const [isAddUser, setIsAddUser] = useState(true); // Add userImage state
  const [lastMessage, setLastMessage] = useState(null); // Add lastMessage state


  return (
    <MyContext.Provider
      value={{
        selectedContact,
        setSelectedContact,
        userImage,
        setUserImage,
        isAddUser,
        setIsAddUser,
        lastMessage, 
        setLastMessage
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

export { MyProvider, useMyContext };
