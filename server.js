const http = require('http');
const handleSQLite = require('./handleSQLite');
//const path = require("path");
//const express = require('express');
const fs = require('fs');
const port = 8080;
//const app = new express();
//app.use(express.static(__dirname+'./public'));


let dataBase = new handleSQLite();
dataBase.openDatabase();

let sqlCreate = `CREATE TABLE storage(BoxNum REAL, ItemName TEXT, Location TEXT)`


//dataBase.db.run(`INSERT INTO storage VALUES(3, 'cheese cart', 'Storage Room')`)

dataBase.db.all(`SELECT ItemName
                 FROM   storage`, (err, rows) => {
                     if (err) throw err;

                     fs.writeFile('pass.json', JSON.stringify(rows), err => {
                         if (err) throw err

                         console.log("Pass Filled");
                     });
                 });


// Open Server
const server = http.createServer(function(req, res) {
    
    // Handle main page request
    if (req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html'})
        fs.readFile('index.html', function(error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Error: File Not Found');
            } else {    
                res.write(data);
            }
            res.end();
        })
    }

    // Handle stylesheet request
    else if (req.url === '/style.css') {
        res.writeHead(200, { 'Content-Type': 'text/css'})
        fs.readFile('style.css', function(error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Error: File Not Found');
          } else {
              res.write(data);
          }
          res.end();
        })
    }

    // Handle Javascript request
    else if (req.url === '/main.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript'})
          fs.readFile('main.js', function(error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: File Not Found');
              } else {
                  res.write(data);
              }
              res.end();
        })
    }

    // Handle Json request
    else if (req.url === '/handleJson.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript'})
          fs.readFile('handleJson.js', function(error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: File Not Found');
              } else {
                  res.write(data);
              }
              res.end();
        })
    }

    // Handle Json file
    else if (req.url === '/pass.json') {
        res.writeHead(200, { 'Content-Type': 'application/json'})
          fs.readFile('pass.json', function(error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: File Not Found');
              } else {
                  res.write(data);
              }
              res.end();
        })
    }

    // Handle image request
    else if (req.url === '/img/search.png') {
        res.writeHead(200, { 'Content-Type': 'image/png'})
          fs.readFile('img/search.png', function(error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: File Not Found');
              } else {
                  res.write(data);
              }
              res.end();
        })
    }

    // Handle SQL request
    else if (req.url === '/handleSQLite.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript'})
          fs.readFile('handleSQLite.js', function(error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: File Not Found');
              } else {
                  res.write(data);
              }
              res.end();
        })
    }

    // Handle database request
    else if (req.url === './db/storage.db') {
        res.writeHead(200, { 'Content-Type': 'text/plain'})
          fs.readFile('./db/storage.db', function(error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: File Not Found');
              } else {
                  res.write(data);
              }
              res.end();
        })
    }


    
});


// Open the port to listen to
server.listen(port, '172.16.1.80' || 'localhost', function(error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});




