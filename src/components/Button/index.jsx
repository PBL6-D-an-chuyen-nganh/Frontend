import React from 'react'

function button({title, path}) {
  return (
    <div>
        <Link to={path}>
            <button className='border-1 rounded-lg px-6 py-1 text-white bg-green-900 cursor-pointer hover:bg-white hover:text-green-900' 
                        style={{ borderColor: "#E0E8E0" }}
            >
            {title}
            </button>
        </Link>
    </div>
  )
}

export default button