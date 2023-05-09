// load .env data into process.env
require("dotenv").config();


// Web server config
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;
const dbClient = require("./db/connection");
const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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


const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


//auth0 router
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config)); // auth router attaches /login, /logout, and /callback routes to the baseURL

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}); // req.isAuthenticated is provided from the auth router


//sockets router
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("time", (data) => {
    io.emit("sentTime", data);
  });

  socket.on('complete',(data) => {
    io.emit('sentComplete', data);
  });

  socket.on('newOrder', (data) => {
    io.emit('sentNewOrder', data);
  });
});

io.listen(3000);