const router = require("./food-api");
require("dotenv").config('../env');


const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;


const sendSmsOnOrderPlaced = () => {
  client.messages
    .create({
      body: "FoodHub: A new order has been placed! Please see website to submit pickup time.",
      to: "+17809078501",
      from: twilioPhoneNumber,
    })
    .then((message) => console.log(message.sid));
};

const sendSmsOnOrderComplete = () => {

  client.messages
    .create({
      body: "FoodHub: Your food is ready! Thank you for ordering from FoodHub!",
      to: "+17809078501",
      from: twilioPhoneNumber,
    })
    .then((message) => console.log(message.sid));

};

const sendSmsOnOrderTime = (est_completion_time) => {

  client.messages
    .create({
      body: `FoodHub: Your order has been processed! Your food will be ready for pick up in ${est_completion_time} minutes.`,
      to: "+17809078501",
      from: twilioPhoneNumber,
    })
    .then((message) => console.log(message.sid));

};

router.get('/placed', (req, res) => {
  sendSmsOnOrderPlaced();
  res.status(200).send('ok');
});

router.get('/completed', (req, res) => {
  sendSmsOnOrderComplete();
  res.status(200).send('ok');
});

router.post('/orderTime', (req, res) => {
  sendSmsOnOrderTime(req.body.time);
  res.status(200).send('ok');
});

module.exports = router;