DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id int(4) AUTO_INCREMENT,
  product_name VARCHAR(50),
  department_name VARCHAR(30),
  price DECIMAL(13,2),
  stock_quantity SMALLINT,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Nike Free 5.0', 'Footwear', 59.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('XBOX One X', 'Electronics', 299.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Vic Firth 5B Drumsticks', 'Musical Instruments', 11.50, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Woodford Reserve Bourbon 750ml', 'Food and Beverage', 42.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2009 Honda Civic EX coupe', 'Auto', 4500.00, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Doritos Cool Ranch', 'Food and Beverage', 4.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Nike Kobe Mamba Instinct', 'footwear', 65.00, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Banana Republic Mens Sweater', 'Clothing', 69.99, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Bose Quiet Comfort 35 Headphones', 'Electronics', 350.00, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Red Jelly Beans 1ea.', 'Food and Beverage', 00.01, 10000);