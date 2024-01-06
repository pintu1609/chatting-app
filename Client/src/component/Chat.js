import React from 'react'
import cam from '../img/cam.png'
import add from '../img/add.png'
import more from '../img/more.png'
import Message from './Message'
import Input from './Input'
import {  useState } from 'react'
import Addfriend from './Addfriend'
import { useMyContext } from '../context/MyContext'

const Chat = () => {
  const { selectedContact } = useMyContext();
  console.log("🚀 ~ file: Chat.js:13 ~ Chat ~ selectedContact:", selectedContact.message)
  const contactName = selectedContact && selectedContact.name;
  const userid = selectedContact && selectedContact._id;

  

  

  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  
  const handleAddFriend = () => {
    setShowAddFriendModal(true);
  };


  return (
    <div className='chat'>
        <div className='chatinfo'>
      <div className='chattitle'>
        <span> {contactName}</span>
        {/* <p style={{ color: "white" }}>{isTyping ? "typing..." : "status"}</p> */}
        
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
