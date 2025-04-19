import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Add from "../img/download.png";
import { useMyContext } from "../context/MyContext";
import socket from "../socket";

const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const { setUserImage } = useMyContext();

  const fetchUser = async () => {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setUser(response.data.data);
      setUserImage(response.data.data.image);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      navigate("/");
    }
  }, [token]);

  const handleLogout = () => {
    if (socket && user?._id) {
      socket.emit("offline", user._id); // ✅ emit offline before logout
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="navbar">
      <span className="logo"> Chating app</span>
      <div className="user">
        <img src={user?.image ? user.image : Add} alt="" />
        <span> {user?.name}</span>
        <button
          className="btn1"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
