import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../../components/UserHeader'
import Footer from '../../components/Footer'
import ChatbotWidget from '../../components/Chatbot/ChatbotWidget'

function DefaultLayout() {
  return (
    <div>
        <UserHeader/>
        <ChatbotWidget />
        <Outlet />
        <Footer/>
    </div>
  )
}

export default DefaultLayout