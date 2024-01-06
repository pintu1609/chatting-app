import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos"; // Import AOS library
import "aos/dist/aos.css"; // Import AOS styles

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api/v1";

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/user/login`, formData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data?.data?.accessToken);
        localStorage.setItem("userId", response.data?.data?.data?.id);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid email or password. Please try again.");
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

  useEffect(() => {
    if (token) return navigate("/home");
  }, [token]);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="formcontainer" >
      <div className="formwrapper"data-aos="fade-up"data-aos-duration="1500">
        <span className="logo">Chating app</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email or UserName"
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
          {error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btt">
            Log In
          </button>
        </form>
        <p>
          {" "}
          you do have an account?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
