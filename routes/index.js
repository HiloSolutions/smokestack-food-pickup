const express = require('express');
const router = express.Router();
const db = require("../db/connection");
const { requiresAuth } = require('express-openid-connect');

router.get('/', (req, res) => {
  res.render("index", {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

//get menu items from database to display on home page
router.get('/menu', (req, res) => {
  console.log("getting menu items");

  const queryStr = `SELECT * FROM users`;

  db.query(queryStr)
    .then((result) => {
      console.log('jhsgdhsg', result.rows.length);
      res.json(result.rows);
    })

    .catch((err) => {
      console.error(err);
    });

});

router.get('/customer', requiresAuth(), (req, res) => {
  res.render("customer", {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

module.exports = router;
