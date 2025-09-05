import React from 'react'
import backgroundImage from '../../assets/img/BG.jpg'
import ForgetPass from '../../components/ForgetPass'

function ForgetPassPage() {
  return (
    <div>
        <div className='relative min-h-screen'>
            <img 
                src={backgroundImage} 
                alt="background" 
                className="absolute inset-0 w-full h-full object-cover"
            />
             <div className='relative z-10 flex items-center justify-center min-h-screen'>
              <ForgetPass />
          </div>
        </div>
    </div>
  )
}

export default ForgetPassPage