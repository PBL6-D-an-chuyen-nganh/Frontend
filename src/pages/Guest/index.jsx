import React from 'react'
import guestimg from '../../assets/img/guestimg.png'

function GuestPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 flex flex-col items-center justify-center bg-green-900 px-8">
        <h1 className="text-white text-3xl font-medium mb-4">
          LÀN DA KHOẺ, CUỘC SỐNG ĐẸP
        </h1>
        <span className="text-gray-300 text-lg font-normal text-center">
          Nền tảng hỗ trợ chẩn đoán da liễu và đặt lịch khám nhanh chóng, tiện lợi.
        </span>
      </div>

      <div className="w-1/2 h-screen">
        <img
          src={guestimg}
          alt="guest"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default GuestPage
