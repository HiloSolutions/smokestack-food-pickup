const express = require('express');
const router = express.Router();



router.get('/authenticationCheck', (req, res) => {
  const loginStatus = req.oidc.isAuthenticated();
  console.log(loginStatus);
  res.json(loginStatus);
});


module.exports = router;