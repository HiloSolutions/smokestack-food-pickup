const express = require('express');
const cookieSession = require('cookie-session');
const dbClient = require('./db/connection');
const indexRouter = require('./routes/index.js');
const { auth } = require('express-openid-connect');
const orderStatusRoutes = require('./routes/order-status');
const restaurantRoutes = require('./routes/restaurant-home');
const dbRoutes = require('./routes/db-updates');
const orderRoutesToDabase = require('./routes/order');
//const { Server } = require('socket.io');
//const smsRoutes = require('./routes/sms');
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

app.use(
  cookieSession({
    name: 'session',
    keys: ['test'],
  })
);

app.use(auth(config));

app.use('/', indexRouter);
app.use('/order-status', orderStatusRoutes);
app.use('/send-order', dbRoutes);
app.use('/restaurants', restaurantRoutes);
//app.use('/sms', smsRoutes);
app.use('/order', orderRoutesToDabase(dbClient));

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