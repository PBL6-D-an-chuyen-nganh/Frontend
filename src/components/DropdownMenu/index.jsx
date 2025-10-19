import React from 'react';
import MenuItem from '../MenuItem';
import { RxAvatar } from "react-icons/rx";
import { IoIosHelpCircleOutline, IoIosLogOut } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";

const DropdownMenu = ({ userId, onLogout}) => (
  <div className="absolute w-[230px] top-full right-0 border border-gray-100 shadow-md rounded-md bg-white/30 backdrop-blur-sm z-50">
    <div className="mx-3 py-2 font-medium">
        <MenuItem title={'Trang cá nhân'} icon = {<RxAvatar size = '28'/>} path={`/profile/${userId}`} />
        <div className="border-t my-1 border-green-900" />
        <MenuItem title={'Lịch sử đặt lịch'} icon={<AiOutlineSchedule size = '28'/>} path={`/appointments/${userId}`} />
        <div className="border-t my-1 border-green-900" />
        <MenuItem title={'Lịch sử khám bệnh'} icon={<FaRegAddressBook size = '28'/>} />
        <div className="border-t my-1 border-green-900" />
        <MenuItem title={'Giúp đỡ và phản hồi'} icon={<IoIosHelpCircleOutline size = '28'/>} />
        <div className="border-t my-1 border-green-900" />
        <MenuItem title={'Đăng xuất'} icon = {<IoIosLogOut size = '28'/>} onClick={onLogout} />
    </div>
  </div>
);

export default DropdownMenu;
