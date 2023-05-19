/********** GLOBAL VARIABLES **********/
const date = new Date();
const orderTime = date.toLocaleTimeString();
const socket = io();
let uniqueId = 0;

//get all orders from database
const loadPendingOrders = () => {
  fetch(`http://localhost:8080/admin/pendingOrders?date=${date}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      appendPendingOrders(data);
    })
    .catch((err) => {
      console.log('Error (loadOrders)', err);
    });
};

const loadCompleteOrders = () => {
  fetch(`http://localhost:8080/admin/completeOrders?date=${date}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      appendCompleteOrders(data);
    })
    .catch((err) => {
      console.log('Error (loadOrders)', err);
    });
};


/********** APPEND ORDER REQUESTS **********/
const createOrderItems = (order) => {
  const id = order.id;
  const customerName = order.customerName;
  const phone = order.phone;
  const targetCompletionTime = order.targetCompletionTime;
  const specialInstructions = order.specialInstructions;
  const orderTime = order.orderTime;
  let listItems = '';

  for (const item of order.items) {
    const itemPrice = item.meal_quantity * Number(item.price);
    const qty = item.meal_quantity;
    const mealName = item.meal_name;
    listItems += `<li>${mealName} x ${qty} (${itemPrice})</li>`;
  }
  const markup =
    `<section id="${id}-order-confirmed-container" class="current-order grow">
       <header>
         <h3>${customerName}</h3>
         <h3>${orderTime}</h3>
       </header>
         <ul>
           ${listItems}
         </ul>
         <label>Additional comments</label>
         <p>${specialInstructions}</p>

         <form>
           <button id="${id}-btn-confirm" class="btn-submit" type="button">Order Complete</button>

         </form>
       <div>
         <hr class="underline" />
       </div>
     </section>`;
     
  return markup;
};


const appendPendingOrders = (data) => {
  for (const i of data) {
    createOrderItems({
      id: i.id,
      items: i.items,
      customerName: i.items[0].customer_name,
      phone: i.items[0].phone_number,
      targetCompletionTime: i.items[0].est_completion_time,
      specialInstructions: i.items[0].special_instructions,
      orderTime: i.items[0].order_time
    });
  }

};

const appendCompleteOrders = (data) => {
  console.log('appendCompleteOrders', data);
};

/*********** PENDING ORDER REQUESTS **********/
//Creates HTML markup of pending request with time estimate input form
// const createRequestElement = (orderObj, id) => {
//   const name = orderObj.name;
//   const customRequest = orderObj.message;
//   const meals = mealList(orderObj.order);



// /*********** ORDER REQUESTS **********/
// const addToProcessedOrders = (orderObj, id) => {
//   const name = orderObj.name;
//   const customRequest = orderObj.message;
//   const meals = mealList(orderObj.order);
//   const markup = `
//     <section id="${id}-order-confirmed-container" class="current-order grow">
//       <header>
//         <h3>${name}</h3>
//         <h3>${orderTime}</h3>
//       </header>
//         <ul>
//           ${meals}
//         </ul>
//         <label>Additional comments</label>
//         <p>${customRequest}</p>

//         <form>
//           <button id="${id}-btn-confirm" class="btn-submit" type="button">Order Complete</button>

//         </form>
//       <div>
//         <hr class="underline" />
//       </div>
//     </section>`;

//   $("#current-orders-container").append(markup);

//   $(`#${id}-btn-confirm`).click(function(e) {
//     $(`#${id}-order-confirmed-container`).hide(100);


//     // Set order status as finished for the current object
//     orderObj.finished = true;
//     localStorage.setItem("orderList", JSON.stringify(existingOrders));



//     socket.emit("complete", "awesome!");
//     $.get("/sms/completed");
//   });
// };

// //Returns HTML markup of meal and quantity list passed in an object (used for pending orders and processed orders)
// const mealList = (mealObj) => {
//   let string = "";
//   const mealList = Object.values(mealObj);

//   for (const meal of mealList) {
//     string += `<li>${meal.id} x ${meal.qty}</li>`;
//   }
//   return string;
// };

// // appendOrderHistory(userOrder);

$(document).ready(() => {
  // Add all existing orders on page load
  loadPendingOrders();
  loadCompleteOrders();

  // Add individual new orders whenever cart is submitted
  socket.on("sentNewOrder", () => {
    uniqueId++;

    // const newOrder = JSON.parse(localStorage.getItem("userOrder"));
    // existingOrders.push(newOrder);
    // localStorage.setItem("orderList", JSON.stringify(existingOrders));
    // //createRequestElement(newOrder, uniqueId);

  });



});