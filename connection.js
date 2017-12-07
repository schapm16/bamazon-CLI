var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  port: 3306,

  user: 'root',

  password: '',
  database: 'bamazon_db'
});

module.exports = function connect(viewModuleStart, redirectToMain) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    
    //Once a connection is grabbed from the pool and established, the view module that the user 
    //selected in main.js is fired.  That module is also passed 'pool' - granting access 
    //to 'pool.end()' to be used at the end of the session, 'connection' - granting access 
    //to 'connection.query' and 'redirectToMain' - allowing the fired view module 
    //to redirect the user back to main.js to select another view module as desired
    viewModuleStart(pool, connection, redirectToMain);
  });
};
