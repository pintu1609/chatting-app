import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMyContext } from "../context/MyContext";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api/v1";

const Addfriend = ({ closeModal }) => {
  const { setIsAddUser } = useMyContext();
  const navigate = useNavigate;

  const token = localStorage.getItem("token");

  const [friend, setFriend] = useState({ addedTo: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/contact`, friend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.status === 200) {
        //write code to close modal
        setIsAddUser((prev) => !prev);
        closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add friend. Please try again.");

      if (error.response && error.response.data && error.response.data.message) {
        // Handle specific error messages from the server
        setError(error.response.data.message);
      } else {
        setError("Failed to add friend. Please try again.");
      }

      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/home");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFriend((prevfriend) => ({
      ...prevfriend,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="modal d-flex" tabIndex="-1">
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              background: "#ddddf7",
              position: "relative",
              left: "275px",
              top: "90px",
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Add Friend</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <div className="card" style={{ width: "20rem" }}>
                <div className="card-body" style={{ background: "#5d5d8d" }}>
                  <form>
                    <input
                      type="text"
                      placeholder="Enter UserName"
                      name="addedTo"
                      value={friend.email}
                      onChange={handleChange}
                      style={{ background: "#5d5d8d" }}
                    />
                  </form>
                </div>
              </div>
              {error && (
                <div className="alert alert-danger mt-2" role="alert" >
                  {error}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </div>
  );
};

export default Addfriend;
