const express = require('express');
const router = express.Router();
const db = require("../db/connection");
const { requiresAuth } = require('express-openid-connect');
const { parse, getMonth } = require('date-fns');

//format dates from one str to another
const formatDate = (dateStr) => {
  const dateArr = dateStr.split(" ");
  const yyyy = dateArr[3];
  const dd = dateArr[2];
  const mm = getMonth(parse(dateArr[1], 'MMMM', new Date())) + 1;
  return `${yyyy}-${mm}-${dd}`;
};


//format query results for pending and complete orders to group by order
const reformatOrdersQueryResult = (data) => {
  const groupedData = [];
  
  data.forEach(item => {
    const { id, ...rest } = item;
    const existingGroup = groupedData.find(group => group.id === id);
    
    if (existingGroup) {
      existingGroup.items.push(rest);
    } else {
      groupedData.push({ id, items: [rest] });
    }
  });
  
  return groupedData;
};



router.get('/', (req, res) => {
  res.render('admin');
});

//get pending orders from database
router.get('/pendingOrders', (req, res) => {
  
  const date = formatDate(req.query.date);
  const queryStr = `
  SELECT 
    users.customer_name, 
    users.phone_number, 
    order_meals.meal_quantity, 
    meals.meal_name, meals.price, 
    orders.est_completion_time, 
    orders.order_time, 
    orders.special_instructions, 
    orders.id 
  FROM orders 
  JOIN users ON orders.customer_id = users.id
  JOIN order_meals ON orders.id = order_meals.order_id
  JOIN meals ON order_meals.meal_id = meals.id
  WHERE orders.date_added = $1 AND orders.is_fulfilled = $2
  `;
  const params = [date, false];
  
  db.query(queryStr, params)
    .then((result) => {
      const formattedResult = reformatOrdersQueryResult(result.rows);
      res.json(formattedResult);
    })
    .catch((err) => {
      console.error(err);
    });

});

//

//get complete orders from database
router.get('/completeOrders', (req, res) => {
  
  const date = formatDate(req.query.date);
  const queryStr = `
  SELECT 
    users.customer_name, 
    users.phone_number, 
    order_meals.meal_quantity, 
    meals.meal_name, meals.price, 
    orders.est_completion_time, 
    orders.order_time, 
    orders.special_instructions, 
    orders.id 
  FROM orders 
  JOIN users ON orders.customer_id = users.id
  JOIN order_meals ON orders.id = order_meals.order_id
  JOIN meals ON order_meals.meal_id = meals.id
  WHERE orders.date_added = $1 AND orders.is_fulfilled = $2
  `;
  const params = [date, true];
  
  db.query(queryStr, params)
    .then((result) => {
      const formattedResult = reformatOrdersQueryResult(result.rows);
      res.json(formattedResult);
    })
    .catch((err) => {
      console.error(err);
    });

});


router.post('/orders', (req, res) => {
  const timeEstimate = req.body.timeEstimate;

  //Test to see timeEstimate being stored in orders object
  orders[1].timeEstimate = timeEstimate;
  console.log("orders id 1", orders[1]);

  res.redirect('/admin');
});


module.exports = router;