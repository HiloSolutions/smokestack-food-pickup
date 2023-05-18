/* eslint-disable no-undef */
//send text messages
const sendText = () => {
  $.get('/sms/placed', (req, res) => {
    socket.emit('newOrder', 'awesome!');
  });
};

//confirm checkout
$('#confirmation-form').submit((e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  if ($('#name').val().length === 0 || $('#tel').val().length < 7) {
    return;
  }

  const order = {
    order: JSON.parse(localStorage.getItem('order')),
    name: $('#name').val(),
    tel: $('#tel').val(),
    message: $('#message').val()
  };


  $.post('/orders/submitOrder', order, () => {
  });

  window.location.href = 'http://localhost:8080/orders/';

  sendText();
});

