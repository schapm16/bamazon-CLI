//This module is the traffic controller.  The user can select between the customer, manager
//and supervisor view and be redirected accordingly.  This module will establish database connection using
//connect() from connection.js and fire the selected view once a successful connection has been made.
//Ending the connection is handled within the module corresponding to the selected view. (ie. bamazonCustomer,
//bamazonManager and bamazonSupervisor)

// Inquier is required to ask the user which view they would like to see.
var inquirer = require('inquirer');

//Stores function connect() from connection.js
var connect = require('./connection.js');

//Stores the primary (ie. wrapping) function of each view module to be passed to connect()
//as a call back
var customerModule = require('./bamazonCustomer.js');


function main() {
    console.log('\n');
    
    inquirer.prompt([
        {
            type: 'list',
            name: 'viewSelect',
            message: 'Which view would you like to use?',
            choices: [{ name: 'Customer View', value: 'customer' }]
        }

    ]).then(answer => {

        switch (answer.viewSelect) {
            case 'customer':
                connect(customerModule, main);
                break;
        }
    });
}


//>>>Fire Initial Execuation<<<
main();