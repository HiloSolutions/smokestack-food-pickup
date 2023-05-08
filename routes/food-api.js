/*
 * All routes for foodApi are defined here
 * Since this file is loaded in server.js into /,
 *   these routes are mounted onto /foodApi
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/order-status", (req, res) => {
  res.render("order-status");
});

module.exports = router;