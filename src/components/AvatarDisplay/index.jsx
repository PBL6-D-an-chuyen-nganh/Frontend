import React from 'react';
import avatar from '../../assets/img/avt.jpg'; 

const AvatarDisplay = ({ username, onClick }) => (
  <div className="flex w-full items-center gap-5">
    <div className="w-3/4 h-full flex flex-col items-end justify-center text-md font-semibold text-gray-600">
      <span className="">{username}</span>
      <span className="flex flex- items-center gap-1"></span>
    </div>
    <div className="flex-1">
      <img
        className="size-12 cursor-pointer rounded-full"
        onClick={onClick}
        src={avatar}   
        alt="avatar"
      />
    </div>
  </div>
);

export default AvatarDisplay;
