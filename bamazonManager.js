module.exports = function managerModule(pool, connection, redirectToMain) {
  //npm packages required by customerModule
  var inquirer = require('inquirer');
  require('console.table');
  //--------

  //>>>> Function Declarations <<<<
  
  function displayProducts(addInventoryPrompt, redirect) { //invocation with callback used in addToInventory();
    var listedItems = [];

    connection.query('SELECT * FROM products', function(err, results) {
      if (err) throw err;

      // This loop does the following: 
      // 1) Updates the price values to show '$' sign
      // 2) Builds an array of all the listed items (this is returned as a courtesy and used in addToInventory())
      for (var i = 0; i < results.length; i++) {
        results[i].price = "$" + results[i].price.toFixed(2);
        listedItems.push(results[i].item_id);
      }

      console.table('\nPRODUCT LIST', results);
      
      if (addInventoryPrompt) {
        addInventoryPrompt(listedItems);
      }
      else if (redirect) {
        redirect();
      }
    });
  }

  function viewLowInventory(redirect) {

    connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err, results) {
      if (err) throw err;

      // This loop updates the price values to show '$' sign
      for (var i = 0; i < results.length; i++) {
        results[i].price = "$" + results[i].price.toFixed(2);
      }

      console.table('\nPRODUCT LIST', results);
      redirect();

    });
  }

  function addToInventory(redirect) {
    
    console.log('\n');

    //addInventoryPrompt() is invoked as a callback. See displayProducts(addInventoryPrompt) invocation at the bottom of addToInventory()  
    function addInventoryPrompt(listedItems) { 
      inquirer.prompt([{
          type: 'input',
          name: 'itemToUpdate',
          message: 'Enter the item_id of the product you would like to add inventory to:',
          validate: function(input) {
            if (listedItems.indexOf(parseInt(input)) === -1) {
              return false;
            }
            else {
              return true;
            }
          }
        },
        {
          type: 'input',
          name: 'updateQuantity',
          message: 'Enter how many eaches you would like to add to stock_quantity',
          validate: function(input) {
            if (isNaN(parseInt(input)) === true) {
              return false;
            }
            else {
              return true;
            }
          }
        }

      ]).then(answers => {
        
        var updateQuantity = parseInt(answers.updateQuantity);
        var itemId = parseInt(answers.itemToUpdate);
        
        connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?', [updateQuantity, itemId], function(err) {
          if (err) throw err;
        });
        
        redirect();
        
      });
    }
    
    //Prints a table of all the listed products BEFORE the user gets prompted for information
    //and stores the valid item_id values as returned from displayProducts
    displayProducts(addInventoryPrompt); 
  }
  
  function addNewProduct(redirect) {
    
    inquirer.prompt([ //I did not have time to code user input validation for this operation
      {
        type: 'input',
        name: 'product_name',
        message: 'Enter the new product_name:'
      },
      {
        type:'input',
        name: 'department_name',
        message: 'Enter the department_name of the new product:',
      },
      {
        type: 'input',
        name: 'price',
        message: 'Enter the price of the new product (do not include $ sign):'
      },
      {
        type: 'input',
        name: 'stock_quantity',
        message: 'Enter the stock_quantity of the new product:'
      }
      ]).then(answer => {
        var product_name = answer.product_name;
        var department_name = answer.department_name;
        var price = parseFloat(answer.price);
        var stock_quantity = parseInt(answer.stock_quantity);
        
        connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)', [product_name, department_name, price, stock_quantity], function(err) {
          if (err) throw err;
        });
        
        redirect();
      });
  }
  
  function redirect() { //This is a utility function to redirect the user as they desire after completion of one of the operations above

    inquirer.prompt([{
      type: 'list',
      name: 'redirect',
      message: 'Do you wish to return to the main screen, restart the manager view here or end your session?',
      choices: [{
          name: 'Restart Manager View',
          value: 'remain'
        },
        {
          name: 'Return to Main Screen',
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
          managerModule(pool,connection, redirectToMain);
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
  
  function operationSelection() {

    inquirer.prompt([{
      type: 'list',
      name: 'operationSelected',
      message: 'What do you need to do?',
      choices: [{
          name: 'View all products',
          value: 'allProducts'
        },
        {
          name: 'View Low Inventory',
          value: 'lowInventory'
        },
        {
          name: 'Add to Inventory',
          value: 'addInventory'
        },
        {
          name: 'Add New Product',
          value: 'newProduct'
        }
      ]
    }]).then(answer => {

      switch (answer.operationSelected) {

        case 'allProducts':
          displayProducts(null, redirect);
          break;

        case 'lowInventory':
          viewLowInventory(redirect);
          break;

        case 'addInventory':
          addToInventory(redirect);
          break;

        case 'newProduct':
          addNewProduct(redirect);
          break;
      }

    });
  }
  //>>>> End Function Declarations <<<<

  //>>>> Execution Begins Here <<<<
  operationSelection();
};
