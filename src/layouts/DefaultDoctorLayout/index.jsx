import React from 'react'
import { Outlet } from 'react-router-dom'
import DoctorHeader from '../../components/DoctorHeader'
import Footer from '../../components/Footer'

function DoctorLayout() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
            <DoctorHeader/>
        </div>
        <div className="pt-24 grow bg-gray-50">
            <Outlet />
        </div>
        <Footer/>
    </div>
  )
}

export default DoctorLayout