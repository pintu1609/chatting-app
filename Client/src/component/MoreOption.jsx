import React from "react";
import "./moreOption.css";
import Add from "../img/download.png";

import { FiUsers, FiUser, FiLogOut, FiX } from "react-icons/fi"; // icons

const MoreOption = ({ user, handleLogout, closeModal, handleCreateGroup }) => {

    
  return (
    <div className="more-modal">
      <div className="more-modal-content">
        <div className="profile-info">
          <img src={user?.image ? user.image : Add} alt="User" className="profile-pic"  style={{width: "40px", height: "40px"}}/>
          <p className="username">{user?.name}</p>
        </div>
        <hr style={{ border: "none", height: "2px", backgroundColor: "#2f2d52", margin: "12px 0" }}/>
        <ul className="modal-options">
        <li onClick={() =>handleCreateGroup()}>
        <FiUsers className="modal-icon" />
        Create Group</li>

          <li onClick={() => alert("Profile settings claicked")}>
          <FiUser className="modal-icon" />
          Profile Settings</li>
          <li onClick={handleLogout}>
          <FiLogOut className="modal-icon" />
          Logout</li>
        </ul>
        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
      
  );
};

export default MoreOption;
