// import React from 'react';
// import { useSearchParams } from 'react-router-dom';

// const Success = () => {
//   const [searchParams] = useSearchParams();

//   // Extract payment details from query parameters
//   const transactionId = searchParams.get('transactionId');
//   const amount = searchParams.get('amount');
//   const status = searchParams.get('status');
//   const timestamp = searchParams.get('timestamp');

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold text-green-500">Payment Successful!</h1>
//       <div className="mt-4 bg-white shadow p-4 rounded">
//         <p><strong>Transaction ID:</strong> {transactionId}</p>
//         <p><strong>Amount:</strong> ₹{amount}</p>
//         <p><strong>Status:</strong> {status}</p>
//         <p><strong>Timestamp:</strong> {timestamp}</p>
//       </div>
//     </div>
//   );
// };

// export default Success;




import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const success = () => {
  const navigate = useNavigate()
  return (

    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold text-green-400">Payment Successful!</h1>
    <button 
      className="mt-4 px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
      onClick={() => navigate('/')}
    >
      Go to Home
    </button>
  </div>

    // <div className="flex items-center justify-center h-screen">
    //    <h1 className="text-2xl font-bold text-green-500">Payment Successful!</h1>
    //    <button>GO To Home</button>
    //  </div>


  )
}

export default success