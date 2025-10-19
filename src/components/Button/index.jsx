import React from 'react'
import { Link } from 'react-router-dom'

function Btn({ title, path, onClick, disabled }) {
  return (
    <div>
      <Link to={disabled ? '#' : path}>
        <button
          onClick={onClick}
          disabled={disabled}
          className={`border rounded-lg w-40 h-12 font-medium transition-all duration-200 
            ${disabled 
              ? 'bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed' 
              : 'bg-green-900 text-white border-green-900 hover:bg-white hover:text-green-900 cursor-pointer'
            }`}
          style={{ borderColor: '#E0E8E0' }}
        >
          {title}
        </button>
      </Link>
    </div>
  )
}

export default Btn
