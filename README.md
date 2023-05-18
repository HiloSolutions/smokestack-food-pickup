# Smokestack Food Pickup

![Frontend](https://img.shields.io/badge/FrontEnd-EJS-green) ![Frontend](https://img.shields.io/badge/FrontEnd-jQuery-yellow) ![Frontend](https://img.shields.io/badge/FrontEnd-javascript-yellow) ![Frontend](https://img.shields.io/badge/FrontEnd-CSS-blue) ![Frontend](https://img.shields.io/badge/FrontEnd-HTML-orange)
![Backend](https://img.shields.io/badge/BackEnd-psql-blue) ![Backend](https://img.shields.io/badge/BackEnd-NodeJS-blue) ![Backend](https://img.shields.io/badge/BackEnd-Express-blue)
![Resources](https://img.shields.io/badge/Resources-Auth0-gray) ![Resources](https://img.shields.io/badge/Resources-Socket.io-gray) ![Resources](https://img.shields.io/badge/Resources-Twilio-gray)

>Smokestack is a food pickup application where users can sign in and order food. This was my first fullstack web project. It includes auth0, socket.io and twilio to facilitate user experience.

## Author

**Lauren Johnston** 
* *My Portfolio Site* - TBD
* *My professional profile on* [LinkedIn](https://www.linkedin.com/in/lauren-e-johnston/)

## Showcase

This project was designed to demonstrate:

* EJS and jQuery
  * This frontend website is made using EJS and jQuery.
* Socket.io
  * Real-time communication between the client and the restaurant happens in real-time.
* Auth0
  * Authentication testing for future projects (although this is not fully set up).
* Twilio
  * API to update the user about their order in real-time (used to augment the order status page)
* PSQL
  * Database development using psql.

## Usage example

### Menu Page
![menu1](./images/screenshot-menu1.png)
![menu2](./images/screenshot-menu2.png)

### Order Status
![orders1](./images/screenshot-orders1.png)

### Restaurant Dashboard
TBD

## Setup
1. Create your own copy of this repo using the Use This Template button, ideally using the name of your project. 
2. The repo should be marked Public.
3. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected.
Clone your copy of the repo to your dev machine

## Playing with the application
1. Create the .env by using .env.example as a reference: cp .env.example .env
2. Update the .env file with your correct local information
**username:** [yourusername]
**password:** smokestack
**database:** smokestack

3. **Install dependencies:** ```npm i```
4. **Reset database:** ```npm run db:reset```
5. **Run the server:** ```npm run```
6. Visit ```http://localhost:8080/```

Note that full setup will require you to set up psql database, auth0 account and twilio account. The variables you need can be added to your .env file (see the example for how your .env file should be set up)
