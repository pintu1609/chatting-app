import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import more from "../img/more.png";
import CreateGroupModal from "./CreateGroupModal";


import { useMyContext } from "../context/MyContext";
import socket from "../socket";
import add from "../img/add.png";
import Addfriend from "./Addfriend";
import MoreOption from "./MoreOption";


const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const { setUserImage } = useMyContext();
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);



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
  const handleAddFriend = () => {
    setShowMoreModal(false);
    setShowAddFriendModal(true);
  };
  const handleMoreOption = () => {
    setShowAddFriendModal(false);
    setShowMoreModal(!showMoreModal);

  }
  const handleCreateGroup = () => {
  setShowMoreModal(false);
  setShowCreateGroup(true);
}

  return (
    <div className="navbar">
      <span className="logo"> Chating app</span>
      <div className="user">

        <img src={add} alt="" onClick={handleAddFriend} />
        <img src={more} alt=""  style={{rotate:"90deg"}} onClick={handleMoreOption}/>
        
        {/* <img src={user?.image ? user.image : Add} alt="" />
        <span> {user?.name}</span>
        <button
          className="btn1"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button> */}
      {showAddFriendModal && (
        <Addfriend closeModal={() => setShowAddFriendModal(false)} />
      )}
       {showMoreModal && (
        <MoreOption closeModal={() => setShowMoreModal(false)} user={user} handleLogout={handleLogout}  handleCreateGroup={handleCreateGroup} />
      )}

      {/* Show CreateGroupModal outside MoreOption */}
      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
      )}
      </div>
    </div>
  );
};

export default Navbar;
