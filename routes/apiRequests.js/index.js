const axios = require('axios');

const getMenuItems = () => {

  return axios.get('http://localhost:8080/menu')
    .then((res) => {
      console.log('getting menu items', res.data);
      return res.data;
    });

};

module.exports = {
  getMenuItems
};