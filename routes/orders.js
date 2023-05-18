const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { dbInsertIntoOrders } = require('../db/queries/orders');
const { requiresAuth } = require('express-openid-connect');

// load order confirmation page

router.get('/', (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  res.render('orderStatus', {
    isAuthenticated,
    user: req.oidc.user
  });

  console.log('1. orders/');
  //dbInsertIntoOrders();
});



router.post('/add', (req, res) => {
  console.log('2. orders/add');
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


router.post('/', (req, res) => {
  console.log('body:', req.body);
  addCustomerToDatabase(req.body.name, req.body.tel)
    .then((customer) => {
      addOrderToDatabase(customer.id, req.body.message)
        .then((order) => {
          addOrderMealsToDatabase(order.id, req.body.order);
        });
    })
    .catch((err) => {
      console.log("customer creation failed:", err);
    });


  return res.send("data posted");
});










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



// // query to create an order
// const insertCustomerIntoDb = (obj) => {
//   const sql = `INSERT INTO customers (
//     name, phone_number)
//       VALUES($1, $2)

//   `;
//   return db.query(sql,[obj.1, obj.2]);
// };

// // const insertRowsInOrdersDb = (obj) => {
// //   return db
//   .query(`
//   INSERT INTO orders (
//     id, customer_id, special_instructions
//   )
//   VALUES (
//     $1, (SELECT id FROM customers WHERE id= ????), $3
//   )
//   `, [obj.1, obj.2, obj.3])
//   .then((result) => {
//     return result.rows[0];
//   })
//   .catch((err) => {
//     console.log(err.message);
//   })
// };

// const insertRowsInMealsDb = (obj) => {
//   return db
//   .query(`
//   INSERT INTO meals`)
// }
module.exports = router;