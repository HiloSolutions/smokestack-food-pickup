/* eslint-disable no-undef */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { dbInsertIntoOrders } = require('../db/queries/orders');
const { requiresAuth } = require('express-openid-connect');

// load order confirmation page

router.get('/', (request, response) => {
  console.log('2. orders/');
  const isAuthenticated = request.oidc.isAuthenticated();
  response.render('orderStatus', {
    isAuthenticated,
    user: request.oidc.user
  });
});



// Route for handling the checkout form submission
router.post('/submitOrder', (req) => {
  const orderID = Number(Math.ceil(Math.random() * 2000000));
  const customerID = 1;
  const isFulfilled = false;
  const specialInstructions = req.body.message;

  const queryStr = `
  INSERT INTO orders (id, customer_id, is_fulfilled, special_instructions) 
  VALUES ($1, $2, $3, $4);
  `;
  const queryValues = [orderID, customerID, isFulfilled, specialInstructions];
  return db.query(queryStr, queryValues);
});






//function to add customer information into the database
const addCustomerToDatabase = (nameOfCustomer, num) => {
  const queryStr = `
    INSERT INTO customers (name, phone_number)
    VALUES ($1, $2)
    RETURNING *;
    `;
  const queryValues = [nameOfCustomer, num];

  return db.query(queryStr, queryValues)
    .then((customerData) => {
      const customer = customerData.rows[0];
      console.log("3. addCustomerToDatabase", customer);
      return customer;
    });
};


//add order to database



//function to add order_meals information into the database
const addOrderMealsToDatabase = (orderId, orderObj) => {
  Object.values(orderObj).forEach(mealObj => {
    const mealName = mealObj.name;
    const mealQuantity = mealObj.qty;
    const mealPrice = mealObj.price;
    const mealQueryStr = `
        INSERT INTO meals (name, price)
        VALUES ($1, $2)
        RETURNING *;
     `;

    const mealQueryValues = [mealName, mealPrice];

    db.query(mealQueryStr, mealQueryValues)
      .then((mealData) => {
        const meal = mealData.rows[0];
        console.log("5. addOrderMealsToDatabase");
        mealOrderConnector(mealQuantity, meal.id, orderId);
      });
  });

};


// router.post('/', (req, res) => {
//   console.log('body:', req.body);
//   addCustomerToDatabase(req.body.name, req.body.tel)
//     .then((customer) => {
//       addOrderToDatabase(customer.id, req.body.message)
//         .then((order) => {
//           addOrderMealsToDatabase(order.id, req.body.order);
//         });
//     })
//     .catch((err) => {
//       console.log("customer creation failed:", err);
//     });


//   return res.send("data posted");
// });




const mealOrderConnector = (qty, mealId, orderId) => {
  const queryStr = `
     INSERT INTO order_meals (order_id, meal_id, meal_quantity)
     VALUES ($1, $2, $3)
     RETURNING *;
     `;

  const queryValues = [qty, mealId, orderId];

  return db.query(queryStr, queryValues)
    .then((data) => {
      const joinRow = data.rows[0];
      console.log("joinRow data is", joinRow);
      return joinRow;
    });
};


// const insertRowsInMealsDb = (obj) => {
//   return db
//   .query(`
//   INSERT INTO meals`)
// }
module.exports = router;