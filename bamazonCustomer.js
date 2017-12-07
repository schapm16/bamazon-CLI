module.exports = function customerModule(connection) {
  //npm packages required by customerModule
  var inquirer = require('inquirer');
  require('console.table');
  //--------
  
  //>>>> Function Declarations <<<<
  function displayProductList() {
    connection.query('SELECT item_id AS `Catalog Number`, product_name AS `Catalog Description`, price as Price FROM products WHERE stock_quantity > 0', function(err, results) {

      for (var i = 0; i < results.length; i++) {
        results[i].Price = "$" + results[i].Price.toFixed(2);
      }
      
      console.table('\nPRODUCT LIST', results);

      connection.end(); // ***This may need to move when bonus is attempted

      purchase(); // ***This may need to move when bonus is attempted
    });
  }

  function purchase() {

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

      connection.query('SELECT stock_quantity, product_name FROM products WHERE item_id = ?', [answers.itemId], function(err, results) {

        if (answers.quantity < results.stock_quantity) {
          console.log('Congrats! You have puchased ' + answers.quantity + ' of the following: ' + answers.product_name);
        }
        else {

        }
      });
    });
  }
  
  //>>>> End Function Declarations <<<<
  
  //>>>> Execution Begins Here <<<<
  displayProductList();
};
