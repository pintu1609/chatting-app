import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Add from "../img/download.png";
import { useMyContext } from '../context/MyContext';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api/v1";

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

  return (
    <div className="navbar">
      <span className="logo"> Chating app</span>
      <div className="user">
        <img src={user?.image ? user.image : Add} alt="" />
        <span> {user?.name}</span>
        <button
          className="btn1"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
