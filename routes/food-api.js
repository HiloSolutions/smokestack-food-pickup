const express = require("express");
const router = express.Router();

router.get("/orderStatus", (req, res) => {
  res.render("orderStatus");
});

module.exports = router;