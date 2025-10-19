import React from 'react'
import { FaRegCalendar } from "react-icons/fa6";

function AppointmentCard({total}) {
  return (
    <div>
        <div className="bg-green-900 text-white rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
                <FaRegCalendar className="w-6 h-6" />
                <h1 className="text-2xl font-bold">LỊCH SỬ ĐẶT LỊCH KHÁM</h1>
            </div>
            <p className="text-white">Bạn đã đặt <span>{total}</span> lịch hẹn</p>
        </div>
    </div>
  )
}

export default AppointmentCard