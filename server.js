const express = require('express');
const dbClient = require('./db/connection');
const { auth } = require('express-openid-connect');
//const { Server } = require('socket.io');

//import router
const indexRouter = require('./routes/index.js');
const orderController = require('./routes/orders');
const customerController = require('./routes/customers');
const adminController = require('./routes/restaurantDashboard');
const databaseController = require('./routes/database');
const smsRoutes = require('./routes/sms');

require('dotenv').config();

const PORT = process.env.EXPRESS_PORT;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};


const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(auth(config));


//use router
app.use('/', indexRouter);
app.use('/orders', orderController);
app.use('/customers', customerController);
app.use('/admin', adminController);
app.use('/api/database', databaseController);
app.use('/sms', smsRoutes);


app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});



app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});





//sockets router
// const io = new Server(server);

// io.on('connection', (socket) => {
//   socket.on('time', (data) => {
//     io.emit('sentTime', data);
//   });

//   socket.on('complete', (data) => {
//     io.emit('sentComplete', data);
//   });

//   socket.on('newOrder', (data) => {
//     io.emit('sentNewOrder', data);
//   });
// });

// io.listen(3000);