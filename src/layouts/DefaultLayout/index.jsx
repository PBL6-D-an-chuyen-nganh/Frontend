import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../../components/UserHeader'
import Footer from '../../components/Footer'

function DefaultLayout() {
  return (
    <div>
        <UserHeader/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default DefaultLayout