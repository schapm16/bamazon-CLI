// Note: I wrote this module using top to bottom function declarations to see if the top-down readability that
// javascript hoisting allows for was worth it.  I don't like it... feels unnatural.

module.exports = function customerModule(pool, connection, redirectToMain) {
  //npm packages required by customerModule
  var inquirer = require('inquirer');
  require('console.table');
  //--------


  //>>>> Function Declarations <<<<

  function displayProductList() {
    
    connection.query('SELECT item_id AS `Catalog Number`, product_name AS `Catalog Description`, price as Price FROM products WHERE stock_quantity > 0', function(err, results) {
      if (err) throw err;

      var availableItems = [];

      // This loop does the following: 
      // 1) Updates the price values to show '$' sign
      // 2) Builds an array of the items that are available for purchase (this is used later in purchase())
      for (var i = 0; i < results.length; i++) {
        results[i].Price = "$" + results[i].Price.toFixed(2);
        availableItems.push(results[i]['Catalog Number']);
      }

      console.table('\nPRODUCT LIST', results);

      // Once products are displayed, purchase() is called to an order by the user.
      purchase(availableItems);
    });
  }

  function purchase(availableItems) {

    // Gather order details from user
    inquirer.prompt([{
        type: 'input',
        name: 'itemId',
        message: 'Enter the Catalog Number of the item you wish to purchase: '
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like?:'
      }
    ]).then(answers => {

      var itemId = parseInt(answers.itemId);
      var orderQuantity = parseInt(answers.quantity);

      // This tests that the user input a valid itemId number before querying the database for stock quantity
      if (availableItems.indexOf(itemId) === -1) {
        console.log('\nYou have entered an invalid Catalog Number\n');
        redirect();
      }
      else {

        // Retrieve the stock quantity for the selected item in order to see if there is enough
        connection.query('SELECT stock_quantity, product_name FROM products WHERE item_id = ?', [itemId], function(err, results) {
          if (err) throw err;

          // Compare the user's order quantity to the available stock quantity and handle accordingly
          if (orderQuantity <= results[0].stock_quantity) {
            console.log('\nCongrats! You have purchased ' + orderQuantity + ' of the following: ' + results[0].product_name + '\n');
            updateDatabase(orderQuantity, itemId); // Database is updated upon successful order
            redirect();
          }
          else {
            console.log('\nInsufficient Quantity!\n');
            redirect();
          }
        });
      }
    });
  }

  function updateDatabase(orderQuantity, itemId) {
    
    connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [orderQuantity, itemId], function(err) {
      if (err) throw err;
    });
  }

  function redirect() {

    inquirer.prompt([{
      type: 'list',
      name: 'redirect',
      message: 'Do you wish to place another order, return to the main screen or end your session?',
      choices: [{
          name: 'Remain here',
          value: 'remain'
        },
        {
          name: 'Return to main screen',
          value: 'main'
        },
        {
          name: 'End Session',
          value: 'end'
        }
      ]
    }]).then(answer => {

      switch (answer.redirect) {
        case 'remain':
          customerModule(pool,connection, redirectToMain);
          break;
        
        case 'main':
          connection.release();
          redirectToMain();
          break;

        case 'end':
          console.log('\nGoodbye!');
          pool.end();
      }
    });
  }
  //>>>> End Function Declarations <<<<

  //>>>> Execution Begins Here <<<<
  displayProductList();
};
