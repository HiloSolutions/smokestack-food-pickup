const express = require('express');
const router = express.Router();
require("dotenv").config('../env');


const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const sendSMS = (messageObject) => {
  client.messages
    .create(messageObject)
    .then((message) => console.log(message.sid));
};



router.get('/placed', (req, res) => {
  const messageObject = {
    body: "FoodHub: A new order has been placed! Please see website to submit pickup time.",
    to: "+17809078501",
    from: twilioPhoneNumber,
  };
  sendSMS(messageObject);
  res.status(200).send('ok');
});



router.get('/completed', (req, res) => {
  const messageObject = {
    body: "FoodHub: Your food is ready! Thank you for ordering from FoodHub!",
    to: "+17809078501",
    from: twilioPhoneNumber,
  };
  sendSMS(messageObject);
  res.status(200).send('ok');
});



router.post('/orderTime', (req, res) => {
  const messageObject = {
    body: `FoodHub: Your order has been processed! Your food will be ready for pick up in ${req.body.time} minutes.`,
    to: "+17809078501",
    from: twilioPhoneNumber,
  };
  sendSMS(messageObject);
  res.status(200).send('ok');
});

module.exports = router;