//This module is the traffic controller.  The user can select between the customer, manager
//and supervisor view and be redirected accordingly


var connect = require('./connection.js');
var customerModule = require('./bamazonCustomer.js');

var connection = connect(function() {
  // console.log("Connection has been established");
  customerModule(connection);
});