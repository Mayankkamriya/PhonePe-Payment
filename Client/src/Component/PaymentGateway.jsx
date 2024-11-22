import React, { useState } from "react";
import axios from 'axios'

const PaymentGateway = () => {
  const [formData, setFormData] = useState({
    name: "Mayank",
    mobile: "885959747975",
    amount: "402",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Details Submitted:", formData);
    const { name, mobile, amount } = formData; 

    const data ={
      name,
      mobile,
      amount,
      MUID:"MUIDW" + Date.now(),
      transactionId: "T" + Date.now(),
    }
    console.log("Sending Data:", data);

  await axios
    .post("http://localhost:8000/order",data)
    .then((response)=>{
      console.log("API Response:", response.data);

      if( response.data && response.data.data.instrumentResponse.redirectInfo.url){
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url
      } else {
        console.error("Redirect URL not found in response:", response.data);
      }
    })
    .catch((error) => {
      console.log("Error:", error)
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
