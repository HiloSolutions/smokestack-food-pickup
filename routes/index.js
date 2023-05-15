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
      console.log(organizedResult);
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
