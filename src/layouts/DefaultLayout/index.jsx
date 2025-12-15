import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../../components/UserHeader'
import Footer from '../../components/Footer'
import ChatbotWidget from '../../components/Chatbot/ChatbotWidget'

function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
            <UserHeader/>
        </div>
        <ChatbotWidget />
        <div className="pt-24 grow bg-gray-50"> 
            <Outlet />
        </div>
        <Footer/>
    </div>
  )
}

export default DefaultLayout