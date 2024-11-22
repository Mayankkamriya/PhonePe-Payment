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

const success = () => {
  return (
    <div className="flex items-center justify-center h-screen">
       <h1 className="text-2xl font-bold text-green-500">Payment Successful!</h1>
     </div>


  )
}

export default success