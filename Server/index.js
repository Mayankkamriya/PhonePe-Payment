require('dotenv').config();

const express = require('express')
const cors = require('cors')
const axios = require('axios')
const crypto = require('crypto');

const app = express();

app.use(cors(
  {
    origin : '*',
    // origin: [process.env.VITE_FRONTEND_URL],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res)=>{
  console.log('process.env.VITE_FRONTEND_URL in cors....',process.env.VITE_FRONTEND_URL)
    res.send("API is running")
})

let salt_key = process.env.SALT_KEY
let merchant_id = process.env.MERCHANT_ID
const frontend = process.env.VITE_FRONTEND_URL
const backend = process.env.VITE_BACKEND_URL
console.log('process.env.VITE_BACKEND_URL...process.env.VITE_FRONTEND_URL...',process.env.VITE_BACKEND_URL,process.env.VITE_FRONTEND_URL)
app.post('/order', async(req,res)=>{
try {
    let{
        MUID,
        amount,
        mobile,
        name,
        transactionId
    } = req.body

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      name: name,
      amount: amount * 100,
      redirectUrl: `${backend}/status?id=${transactionId}`,
      redirectMode: "POST",
      mobileNumber: mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
      };

      console.log('Data1   :',data)
    const KeyIndex =1

    // Base64 encode the payload
    const payload = JSON.stringify(data)
    const payloadMain = Buffer.from(payload).toString("base64");

    // Generate X-VERIFY checksum
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')

    const checksum = sha256+ '###' + KeyIndex

// const prod_URL = "http://api.phonepe.com/api/hermes/pg/v1/pay" // if you are live
const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

const option = {
  method: 'POST',
  url:prod_URL,
  headers: {
      accept : 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum
  },
  data :{
      request : payloadMain
  }
}
console.log('option 1   :',option)

axios.request(option).then((response) => {
  res.json(response.data)

}).catch(error =>{
  console.log(error.message)
  res.status(500).json({error: error.message})
})
    
} catch (error) {
    console.log(error)
}
})

app.post('/status', async (req,res) =>{
  try {
    const merchantTransactionId = req.query.id
    const merchantId = merchant_id

    const keyIndex =1

    console.log('merchantTransactionId  ....',merchantTransactionId)
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` +salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256+ '###' + keyIndex
    
    const options = {
      method: 'get',
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': merchantId
          },
    };

await axios(options).then(response =>{

  if (response.data.success === true) {

    // res.send({   // for showing details on crome browser
    //   message: "Payment successful!",
    //   data: response.data,
    // });
    const paymentDetails = {
      message: "Payment successful!",
      data: response.data,
    };
    console.log('paymentDetails console   : ',paymentDetails)

    // const url = `http://localhost:5173/success?transactionId=${paymentDetails.transactionId}&amount=${paymentDetails.amount}&status=${paymentDetails.status}&timestamp=${paymentDetails.timestamp}`;
    // return res.redirect(url);
    const url = `${frontend}/success`
    return res.redirect(url)

  } else {
    const url = `${frontend}/failure`
    return res.redirect(url)
  }
})

  } catch (error) {
    console.log(error)
  }
})

//listen server
app.listen(8000, ()=>{
    console.log("server is running on port 8000! :)")
})
