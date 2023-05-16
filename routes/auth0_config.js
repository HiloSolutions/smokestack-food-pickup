const auth0 = require('auth0');
require('dotenv').config();

const auth0Config = new auth0.AuthenticationClient({
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENTID
});

module.exports = auth0Config;