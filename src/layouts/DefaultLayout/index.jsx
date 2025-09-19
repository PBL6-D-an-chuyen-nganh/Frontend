import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../../components/UserHeader'

function DefaultLayout() {
  return (
    <div>
        <UserHeader/>
        <Outlet />
    </div>
  )
}

export default DefaultLayout