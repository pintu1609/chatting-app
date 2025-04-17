import React from 'react'
import attached from '../img/attach.png'
import img from '../img/img.png'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMyContext } from '../context/MyContext';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1";


const Input = (props) => {
  console.log('userid Path:', props.user);
  const navigate=useNavigate();


  

  const token = localStorage.getItem("token");
  const [meassageSend, setMeassageSend] = useState({to:props.user, message: "",})

  
  const handleSend = async (e) => {
    e.preventDefault();
    try {
    
      if (!meassageSend.to || !meassageSend.message) {
        console.error("Error: 'to' and 'message' are required.");
        
        return;
      }
      
      const response = await axios.post(`${BASE_URL}/messages`, meassageSend ,{
      headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
          
        });
        
        if (response.status === 200) {
          console.log("🚀 ~ file: Input.js:34 ~ handleSend ~ response:", response)
          
        setMeassageSend({ to: props.user, message: "" });

      }
    } catch (error) {
      console.error("Error:", error);
      
      
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  };

  
  useEffect(() => {
    if (!token) {
      navigate("/home");
    }
  }, [token]);
  
  useEffect(() => {
    setMeassageSend((prevMessageSend) => ({
      ...prevMessageSend,
      to: props.user,
    }));
  }, [props.user]);
  
  
  
  console.log("🚀 ~ file: Input.js:17 ~ Input ~ meassageSend:", meassageSend)
  const handleChange = (e) => {
    const { name, value } = e.target;
    props.mess(value)
    setMeassageSend((prevmeassageSend) => ({
      ...prevmeassageSend,
      [name]: value,
    }));
    
  };

  


  return (
    <div className='input'>
      <div className='inputInfo'>

      <input type='text' placeholder='Type something...' name="message" value={meassageSend.message} onChange={handleChange} 
      onKeyDown={handleKeyDown}           
/>
      </div>
      <div className='send'>
        <img src={attached} alt=''/>
        <input type='file' style={{display:"none"}} id='file'/>
        <label htmlFor="file">
          <img  src={img} alt=""/>
        </label>
        <button className='btn2' onClick={e => handleSend(e) }> Send</button>

      </div>

    </div>
  )
}

export default Input