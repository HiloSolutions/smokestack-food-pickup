//imports for express
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.EXPRESS_PORT;

//imports for auth0
const { auth } = require('express-openid-connect');

//imports for socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


//import router
const indexRouter = require('./routes/index.js');
const orderController = require('./routes/orders');
const customerController = require('./routes/customers');
const adminController = require('./routes/admin.js');
const smsRoutes = require('./routes/sms');

//configure database
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};

//set view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(auth(config));


//use router
app.use('/', indexRouter);
app.use('/orders', orderController);
app.use('/customers', customerController);
app.use('/admin', adminController);
app.use('/sms', smsRoutes);


app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});



app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});


//configure socket io
io.on('connection', (socket) => {
  socket.on('time', (data) => {
    io.emit('sentTime', data);
  });

  socket.on('complete', (data) => {
    io.emit('sentComplete', data);
  });

  socket.on('newOrder', (data) => {
    io.emit('sentNewOrder', data);
  });
});

io.listen(3000);