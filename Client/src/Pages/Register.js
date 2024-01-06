import React, { useState, useEffect } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";
import Add from "../img/download.png";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos"; // Import AOS library
import "aos/dist/aos.css"; // Import AOS styles

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api/v1";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); 


  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState(null);


  const handleFileUpload = async () => {
    setLoading(true); 
    const formData = new FormData();
    formData.append("file", file);
    console.log("🚀 ~ file: Register.js:26 ~ handleFileUpload ~ file:", file);

    try {
      const response = await axios.post(`${BASE_URL}/uploader`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image Upload Response:", response);
      if (response.status === 200) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: response.data.data,
        }));
      } else {
        // Error handle if server sends any error
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
    } finally {
      setLoading(false); 
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, formData);
      if (response.status === 200) {
        localStorage.setItem("userId", response.data?.data?.data?.id);
        localStorage.setItem("token", response.data?.data?.accessToken);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (token) return navigate("/home");
  }, [token]);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div className="formcontainer" >
      <div className="formwrapper" data-aos="fade-up"data-aos-duration="1500">
        <span className="logo">Chating app</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="UserName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email-id"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="passsword"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file">
          {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <>
            <img src={formData.image ? formData.image : Add} alt="" />
            <span> Add An Avatar</span>
            </>
            )}
          </label>

             {error && (
                    <div className="alert alert-danger mt-2" role="alert" >
                        {error}
                    </div>
                )}
          <button type="submit" className="btt">
            Sign up
          </button>
          
        </form>
        <p>
          {" "}
          you do have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
