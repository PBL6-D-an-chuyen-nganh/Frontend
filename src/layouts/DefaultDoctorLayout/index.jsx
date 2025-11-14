import React from 'react'
import { Outlet } from 'react-router-dom'
import DoctorHeader from '../../components/DoctorHeader'
import Footer from '../../components/Footer'

function DoctorLayout() {
  return (
   <div>
        <DoctorHeader/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default DoctorLayout