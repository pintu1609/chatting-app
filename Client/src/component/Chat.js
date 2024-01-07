import React from 'react'
import cam from '../img/cam.png'
import add from '../img/add.png'
import more from '../img/more.png'
import Message from './Message'
import Input from './Input'
import {  useState, useEffect } from 'react'
import Addfriend from './Addfriend'
import { useMyContext } from '../context/MyContext'

import io from 'socket.io-client';

const socket = io(process.env.BASE_URL || 'http://localhost:5000');


const Chat = () => {
  const { selectedContact } = useMyContext();
  console.log("🚀 ~ file: Chat.js:13 ~ Chat ~ selectedContact:", selectedContact.message)
  const contactName = selectedContact && selectedContact.name;
  const userid = selectedContact && selectedContact._id;


  const [isUserOnline, setIsUserOnline] = useState(false);

  useEffect(() => {
    // Emit 'join' event when the component mounts
    socket.emit('join', selectedContact._id);

    // Listen for 'online' event from the server
    socket.on('online', (userId) => {
      if (userId === selectedContact._id) {
        setIsUserOnline(true);
      }
    });

    // Listen for 'offline' event from the server
    socket.on('offline', (userId) => {
      if (userId === selectedContact._id) {
        setIsUserOnline(false);
      }
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [selectedContact]);
  

  

  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  
  const handleAddFriend = () => {
    setShowAddFriendModal(true);
  };


  return (
    <div className='chat'>
        <div className='chatinfo'>
      <div className='chattitle'>
        <span> {contactName}</span>
        <p style={{ color: 'white' }}>{isUserOnline ? 'Online' : 'Offline'}</p>
        
      </div>
      <div className='chatIcons'>
      {selectedContact &&<img src={cam} alt='' />}
      <img src={add}  alt=''  onClick={handleAddFriend}/>
      <img src= {more} alt=''/>
      
      </div>
      </div>
      
      {selectedContact && <Message />}
      {selectedContact && <Input user={userid} />}

      
      {showAddFriendModal && <Addfriend closeModal={() => setShowAddFriendModal(false)} />}
    </div>
  )
}

export default Chat
