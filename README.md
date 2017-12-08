# bamazon-CLI

## Purpose

##### This mock e-commerce nodeJS based app simulates customer and administrative interaction with the site's MySQL database.

Customer interaction includes:
* Selecting a product to purchase from a list of available products
* Selecting the quantity of a product to purchase


Administration interaction includes:
* Viewing entire inventory database
* Viewing data for products that are almost out-of-stock
* Adding additional inventory to existing products
* Adding an entirely new product to inventory

## Demonstrated Techniques
* Establishing a MySQL database
* Perform database manipulation based on user action using the MySQL npm
* Use the Inquirer npm to facilitate user input and input validation
* Practice modular programing
* Making use of self-written callbacks

## Program Flow Overview 

#### main.js
Upon firing `node main.js` the user is asked whether they would like to demonstrate the customer or manager
view.  This interaction is handled by `main.js`.  Once the user makes their decision, execution moves to 
`connection.js`.  

#### connection.js
This module handles making a connection to the localy hosted MySQL database.  The mysql (npm) connection pool
was utilized to serve connections and receive back released connections.

Upon establishing a connection, the appropriate module (`bamazonCustomer.js` or `bamazonManager.js`) is fired.
These modules are passed connection objects to give database query access.


#### bamazonCustomer.js
This module is the primary handler for the customer view and interaction.  A table displaying products available
for "purchase" is immediately displayed on firing.  The user can then select an item to purchase and give the desired quantity.
Once the user input is received and validated, a query is run against the bamazon database to update the stock quantities 
accordingly.  Products that have a `stock_quantity` of `0` are omitted from the customer product list.  In addition,
the customer is programmatically blocked from typing in the `item_id` of an item that is not displayed on their list.

#### bamazonManager.js
This module is the primary handler for the manager view and interaction.  Available to the user is the option to view
all database product data, view product data for products that are almost out of stock (< 5 remaining), add inventory
to the products listed in the database and create a new product from scratch.  If the user selects the `Add to Inventory` 
option, the entire product list is courteously displayed to make product and quantity selection easier.

## Other Notes
* Obviously, a customer would not have access to the manager's view in real life.  However, 
this set-up makes demonstration a breeze.
* Database connections made in `connection.js` are released (ie. ended) in `bamazonCustomer.js` and `bamazonManager.js`.
* I ran out of time and was not able to implement 100% user input validation on all of the inputs.  The user can still break the program.
* I was experimenting with modular programming and making use of callbacks for navigation between modules.  The architecture
is a little funky.


## Fun Notes
* This was the first time I used self-written callbacks and I am super excited about it!
* Areas for improvement: 
    1.  Keeping both modules and functions from spilling over into each other from a functionality
        standpoint.
    2.  Writing concise and effective user input validation.
    3.  Working on them code smells.


### Quick Demo Video
[Youtube - bamazon-CLI Demo Video](https://www.youtube.com/watch?v=UDqMsKQ0UeA)