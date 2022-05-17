'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
// const http = require("http");
// const qs = require("querystring");
// const fetch = require("node-fetch");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
	const markup = `
<!DOCTYPE html>
<html>
<body>
<h2>Inventory</h2>
<h3>Add New Item</h3>
<form id="add_item_form" method="POST" action="/addItem">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" value=""><br><br>
  <label for="qty">Quantity:</label><br>
  <input type="text" id="qty" name="qty" value=""><br><br>
  <label for="price">Price:</label><br>
  <input type="text" id="price" name="price" value=""><br><br>
  <input type="submit" value="Submit">
</form>

<h3>Update Item</h3>
<form id="update_item_form" method="POST" action="/updateItem">
  <label for="name">ID:</label><br>
  <input type="text" id="id" name="id" value=""><br><br>
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" value=""><br><br>
  <label for="qty">Quantity:</label><br>
  <input type="text" id="qty" name="qty" value=""><br><br>
  <label for="price">Price:</label><br>
  <input type="text" id="price" name="price" value=""><br><br>
  <input type="submit" value="Submit">
</form>

<h3>Delete Item</h3>
<form id="delete_item_form" method="POST" action="/deleteItem">
  <label for="name">ID:</label><br>
  <input type="text" id="id" name="id" value=""><br><br>
  <input type="submit" value="Submit">
</form>
</body>
</html>
`
res.send(markup);
});

app.use(bodyParser.urlencoded({extended: true}))

// router.get('/addItem', function(req, res, next) {
//   let uid = req.params.uid;
//   fetch('localhost:8080/inventory').then(res => res.json()).then(function(data) {
//     returned = data.json();
//     console.log(returned);  //expecting array
//     // res.render('./personal/index.jade', {JSON.stringify(returned)});
//   });
// });

MongoClient.connect(db.url, (err, client) => {
	if (err) return console.log(err)
	require('./app/routes')(app, client.db('inventorydb'));
	app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
})

app.post("/addItem", function (req, response) {
  var options = {
    "method": "POST",
    "hostname": "localhost",
    "port": "8080",
    "path": "/inventory",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      "postman-token": "0b939531-b216-d191-6f73-7201294af941"
    }
  };

  const name = req.body.name;
  const qty = req.body.qty;
  const price = req.body.price;

  var req = http.request(options, function (res) {
    var chunks = [];

    response.on("data", function (chunk) {
      // chunks.push(chunk);
      res.write("<p>" + chunk + "</p>");
      res.send();
    });

    response.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(qs.stringify({ name: name, qty: qty, price: price }));
  req.end();
});

app.post("/updateItem/:id", function (req, response) {
  const id = req.params.id;

  var options = {
    "method": "PUT",
    "hostname": "localhost",
    "port": "8080",
    "path": "/inventory/" + id,
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      "postman-token": "6aa81bc2-1aec-c0be-f2f4-c3502f1355f4"
    }
  };

  // alert(req.body)
  const name = req.body.name;
  const qty = req.body.qty;
  const price = req.body.price;

  var req = http.request(options, function (res) {
    var chunks = [];
  
    response.on("data", function (chunk) {
      res.write("<p>" + chunk + "</p>");
      res.send();
    });

    response.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(qs.stringify({ name: name, qty: qty, price: price }));
  req.end();
});

// require('./app/routes')(app, {});


