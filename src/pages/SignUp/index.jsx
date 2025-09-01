import React from 'react'
import backgroundImage from '../../assets/img/BG.jpg'
import SignUp from '../../components/SignUp'

function SignUpPage() {
  return (
   <div className="relative min-h-screen">
    <div>
        <img 
          src={backgroundImage} 
          alt="background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
    </div>
    <div className='relative z-10 flex items-center justify-center min-h-screen'>
      <SignUp />
    </div>
  

</div>

  )
}

export default SignUpPage