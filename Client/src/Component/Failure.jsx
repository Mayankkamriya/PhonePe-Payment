import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Failure = () => {
  const navigate = useNavigate()
  return (

    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold text-red-500">Payment Failed!</h1>
    <button 
      className="mt-4 px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:text-red-500 transition duration-300"
      onClick={() => navigate('/')}
    >
      Go to Home
    </button>
  </div>
    // <div className="flex items-center justify-center h-screen">
    //   <h1 className="text-2xl font-bold text-red-500">Payment Failed!</h1>
    // </div>
  )
}

export default Failure