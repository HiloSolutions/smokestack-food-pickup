/* eslint-disable no-undef */
//get menu items from database
const loadMeals = () => {
  fetch('http://localhost:8080/menu')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderMealList(data.briskets, 'briskets');
      renderMealList(data.friedChicken, 'fried-chicken');
      renderMealList(data.sandwiches, 'sandwiches');
    })

    .catch((err) => {
      console.log('Error (loadMeals)', err);
    });
};



//load menu items onto browser
const renderMealList = (items, foodCategory) => {
  $(`#${foodCategory}`).empty();

  for (const item in items) {
    createMealItem(items[item], foodCategory);
  }

};



//create the menu items
const createMealItem = (meal, foodCategory) => {

  const mealItem = $(`
    <article class="meal grow">
      <header class="meal-header">
      <div><img class="meal-image" src="${meal.img}"></div>
      <div class="meal-name"><strong>${meal.meal_name}</strong></div>
      </header>
      <footer class="meal-footer">
        <div class="price">
          <div><strong>Price:</strong></div>
          <div>$${meal.price}</div>
        </div>
        <button value="${meal.id}" id="${meal.id}" class="addtocart">
          <div><i class="fas fa-cart-plus"></i> ADD TO CART</div>
        </button>
      </footer>
    </article>
  `);

  $(`#${foodCategory}`).append(mealItem);

  //  ----- When specific meal is clicked, add it to order -----//
  $(`#${meal.id}`).click((e) => {
    const id = e.currentTarget.value;
    const order = JSON.parse(localStorage.getItem('order'));

    if (!order[id]) {
      order[id] = { id: meal.id, name: meal.meal_name, price: meal.price, qty: 1 };
    } else {
      return alert("item already selected");
    }

    localStorage.setItem("order", JSON.stringify(order));
    createCartElement(id);
    updateCartTotal();
  });
};



//takes in menu item object, returns a cart <article>
const createCartElement = (id) => {
  const order = JSON.parse(localStorage.getItem('order'));

  const $cartItem = $(
    `
      <div class="cart-row" id="cart-row.${order[id].id}">
        <span class="cart-col-1 cart-column name" id="${order[id].id}">${order[id].name}</span>
        <span class="cart-col-2 cart-column price">$${order[id].price}</span>
        <div class="cart-col-3 cart-column qty">
          <input class="cart-col-3-input" id="update-cart-${order[id].id}" type="number" value="1" min="0" max="9">
          <button class="btn btn-danger" id="remove-cart-${order[id].id}" type="button">x</button>
        </div>
      </div>
      `
  );

  $('.cart-items').append($cartItem);
  //add event listener to remove item from cart and local storage updates
  $(`#remove-cart-${order[id].id}`)[0].addEventListener('click', (e) => {
    const btnClicked = e.target;
    const row = btnClicked.parentElement.parentElement;
    removeItemFromOrder(row);
  });

  //add event listener to update quantity and local storage updates
  $(`#update-cart-${order[id].id}`)[0].addEventListener('change', (e) => {
    const item = e.target;
    const qty = $(item).val()[0];
    updateCartQuantity(id, qty);

  });

  return $cartItem[0];
};



//tracks cart total
const updateCartTotal = () => {
  const order = JSON.parse(localStorage.getItem('order'));
  const total = Object.values(order).reduce((acc, cur) => {
    return acc + (cur.price * cur.qty);
  }, 0);

  $('.cart-total-price').html(total.toFixed(2));

  if ($('.cart-items').children().length === 0) {
    ($('.cart-container')).hide(100);
  } else {
    ($('.cart-container')).show(100);
  }
};



//when qty is changed in cart, update order object. qty cannot exceed 99 or go below 0
const updateCartQuantity = (id, numOfItems) => {
  const order = JSON.parse(localStorage.getItem('order'));

  order[id].qty = Number(numOfItems);

  localStorage.setItem('order', JSON.stringify(order));
  updateCartTotal();

};



// remove item from cart
const removeItemFromOrder = (item) => {
  item.remove(); //remove html row from browser
  const order = JSON.parse(localStorage.getItem('order'));

  const id = $(item).attr('id').split('.')[1];
  delete order[id];

  localStorage.setItem('order', JSON.stringify(order));
  updateCartTotal();
};



// PROCEED TO CHECKOUT
$('.btn-checkout').click(() => {

  const order = JSON.parse(localStorage.getItem('order'));

  //----- count number of order items is > 0 -----//
  const numOfItems = Object.values(order).reduce((acc, cur) => {
    return acc + (cur.qty);
  }, 0);

  if (numOfItems === 0) {
    return alert("please select an item");
  }

  //proceed to checkout if logged in AND number of order items is > 0
  const form = $(`#confirmation-form`)[0];
  $('.overlay').css("display", "block").fadeIn();
  $(form).show(100);

});



// CANCEL CHECKOUT
$('.cancel').click(() => {
  const form = $(`#confirmation-form`)[0];
  $('.overlay').css("display", "none").fadeOut();
  $(form).hide(100);
});



//LOAD MEALS
$(document).ready(() => {
  const order = {};
  localStorage.setItem('order', JSON.stringify(order));

  loadMeals();
});