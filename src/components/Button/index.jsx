import React from 'react'
import { Link } from 'react-router-dom'

function Btn({title, path}) {
  return (
    <div>
        <Link to={path}>
            <button className='border-1 rounded-lg w-40 h-12 text-white bg-green-900 cursor-pointer hover:bg-white hover:text-green-900' 
                    style={{ borderColor: "#E0E8E0" }}
            >
            {title}
            </button>
        </Link>
    </div>
  )
}

export default Btn