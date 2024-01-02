import React from 'react'
import Sidebar from '../component/Sidebar'
import Chat from '../component/Chat'
import { MyProvider } from '../context/MyContext'


const Home = () => {
  return (
    <div className='home'>
        <MyProvider>
        <div className='containers'>
          <Sidebar />
          <Chat />
        </div>
      </MyProvider>
        
        
        </div>
  )
}

export default Home