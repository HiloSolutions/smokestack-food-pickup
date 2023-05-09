require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const { Server } = require("socket.io");
const { auth, requiresAuth } = require('express-openid-connect');

const PORT = process.env.EXPRESS_PORT;

const dbClient = require("./db/connection");

const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["test"],
  })
);

// Separated Routes for each Resource
const foodApiRoutes = require("./routes/food-api");
const orderStatusRoutes = require("./routes/order-status");
const restaurantRoutes = require("./routes/restaurant-home");
const smsRoutes = require("./routes/sms");
const dbRoutes = require("./routes/db-updates");
const orderRoutesToDabase = require('./routes/order');

// Mount all resource routes
app.use("/", foodApiRoutes);
app.use("/order-status", orderStatusRoutes);
app.use("/send-order", dbRoutes);
app.use("/restaurants", restaurantRoutes);
app.use('/sms', smsRoutes);
app.use('/order', orderRoutesToDabase(dbClient));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};



app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});


// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});



app.get('/user', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});





//sockets router
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("time", (data) => {
    io.emit("sentTime", data);
  });

  socket.on('complete', (data) => {
    io.emit('sentComplete', data);
  });

  socket.on('newOrder', (data) => {
    io.emit('sentNewOrder', data);
  });
});

io.listen(3000);