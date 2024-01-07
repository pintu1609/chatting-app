import React from 'react'

const ChatsItem = (props) => {
  const { images, names, onClick, lastMessage } = props;
  // console.log("🚀 ~ file: ChatsItem.jsx:5 ~ ChatsItem ~ lastMessage:", lastMessage)
  const slicedLastMessage = lastMessage ? lastMessage.slice(0, 30) : '';

  
  return (
    <div className='ChatItem' onClick={onClick}>
      <div className="cards" >
        <div className='cardimg'>

            <img src={images} className="card-img-top" alt="..."/>
        </div>
        <div className="card-bodys">
            <h5 className="card-title">{names}</h5>
             <p className="card-text">{slicedLastMessage}  </p>
    
         </div>
</div>
    </div>
  )
}

export default ChatsItem
