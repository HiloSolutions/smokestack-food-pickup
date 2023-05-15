const express = require('express');
const router  = express.Router();
// const {insertRowsInDb} = require('db/queries/orders.js')

router.post('/', (req, res) => {
  res.render('order-status');
});

//
router.post('/orderDb', (req,res) => {
  // insertRowsInDb().then().catch();
  res.status(200).send('ok');
});


module.exports = router;