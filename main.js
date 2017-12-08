//This module is the traffic controller.  The user can select between the customer and manager
//view and be redirected accordingly. (I used an inquirer list to make demonstrating the app easier.
//A real app would have a log in feature.)

//This module will establish database connection using
//connect() from connection.js and fire the selected view once a connection has been made.
//Ending the connection is handled within the module corresponding to the selected view. (ie. bamazonCustomer,
//bamazonManager). 

// Inquier is required to ask the user which view they would like to see.
var inquirer = require('inquirer');

//Stores function connect() from connection.js
var connect = require('./connection.js');

//Stores the primary (ie. wrapping) function of each view module to be passed to connect()
//as a call back
var customerModule = require('./bamazonCustomer.js');
var managerModule = require('./bamazonManager.js');


function main() {
  console.log('\n');

  inquirer.prompt([
    {
      type: 'list',
      name: 'viewSelect',
      message: 'Which view would you like to use?',
      choices: [{ name: 'Customer View', value: 'customer'}, {name: 'Manager View', value: 'manager'}]
    },


  ]).then(answer => {

    switch (answer.viewSelect) {
      case 'customer':
        connect(customerModule, main);
        break;
    
      case 'manager':
        connect(managerModule, main);
        break;
    }
  });
}


//>>>Fire Initial Execuation<<<
main();
