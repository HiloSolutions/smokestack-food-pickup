const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', (req, res) => {
  res.render("index", {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

router.get('/customer', requiresAuth(), (req, res) => {
  res.render("customer", {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

module.exports = router;
