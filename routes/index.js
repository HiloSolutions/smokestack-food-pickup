const express = require('express');
const router = express.Router();
const db = require("../db/connection");
const { requiresAuth } = require('express-openid-connect');

router.get('/', (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  
  res.render("index", {
    isAuthenticated,
    user: req.oidc.user
  });

});


//get menu items from database to display on home page
router.get('/menu', (req, res) => {

  const queryStr = `SELECT * FROM meals`;

  db.query(queryStr)
    .then((result) => {

      const organizedResult = result.rows.reduce((result, item) => {
        const { menu_category, id } = item;

        if (!result[menu_category]) {
          result[menu_category] = {};
        }

        result[menu_category][id] = item;
        return result;
      }, {});

      res.json(organizedResult);
    })

    .catch((err) => {
      console.error(err);
    });

});


//show user infirmation when they are logged in
router.get('/customer', requiresAuth(), (req, res) => {
  res.render("customer", {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

module.exports = router;
