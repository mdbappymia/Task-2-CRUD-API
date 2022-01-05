const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
// my sql connection
const connection = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6463540",
  password: "ZlyTE8d9sg",
  database: "sql6463540",
});
// connection.connect();

connection.connect((e) => {
  if (e) {
    throw e;
  }
  console.log("database connected");
});

// create a table using hit the api
app.get("/createProductTable", (req, res) => {
  const sql =
    "CREATE TABLE products(id int AUTO_INCREMENT, title VARCHAR(30),description VARCHAR(255), price INT, category VARCHAR(20), creationTime VARCHAR(50), image VARCHAR(255), PRIMARY KEY(id))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("table created");
  });
});
// main page
app.get("/", (req, res) => {
  const sql = "SELECT * FROM products LIMIT 20";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// insert product to database
app.post("/products", (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO products SET?";
  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// get product 20 item per page from database
app.get("/products/page/:pageNum", (req, res) => {
  const pageNum = req.params.pageNum;
  const start = (pageNum - 1) * 20;
  const sql = `SELECT * FROM products WHERE id>${start} LIMIT 20`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// get a single product from database
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM products WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// update a single item to database
// http://localhost:5000/sortBy/creationTime
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const updateProduct = req.body;
  const sql = `UPDATE products set title='${updateProduct.title}',description='${updateProduct.description}',price=${updateProduct.price},category='${updateProduct.category}',creationTime='${updateProduct.creationTime}' WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//   delete a single product
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM products WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// category route---------------------------------------
// get product number in a category
app.get("/category", (req, res) => {
  const sql = `SELECT category, COUNT(id) AS 'total' FROM products GROUP BY category ORDER BY total DESC`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// get product for specific category from database
app.get("/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;
  const sql = `SELECT * FROM products WHERE category='${categoryName}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ productCount: result.length, category: categoryName, result });
  });
});

// searching route ---------------------------------------------------
// http://localhost:5000/search?title=bus
app.get("/search", (req, res) => {
  const key = Object.keys(req.query);
  const searchText = req.query[key[0]];
  const sql = `SELECT * FROM products WHERE ${key[0]} LIKE '%${searchText}%'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// shorting by price and date
app.get("/sortBy/:sort", (req, res) => {
  const sortValue = req.params.sort;
  const sql = `SELECT * FROM products ORDER BY ${sortValue}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// listening on the port
app.listen(port, () => {
  console.log("Server is running on port", port);
});
