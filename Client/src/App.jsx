import { Routes , Route } from 'react-router-dom'
import React from 'react'
import Success from './Component/success'
import Failure from './Component/Failure'
import PaymentGateway from './Component/PaymentGateway'

const App = () => {
  return (
    <div>
      <Routes>
        < Route path='/' element={<PaymentGateway />} />
        < Route path='/success' element={<Success />} />
        < Route path='/failure' element={<Failure />} />
        </Routes>
    </div>
  )
}

export default App