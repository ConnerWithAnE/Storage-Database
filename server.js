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


dataBase.db.run(`INSERT INTO storage VALUES(1, 'waffle maker', 'Storage Room')`)

const searchSearchItems = async searchText => {
    const searchRes = await dataBase.db.each(`SELECT ItemName FROM storage`, (err, row) => {
        if (err) {
            throw err;
        }
    }).toArray();
    

    console.log(searchItems);

    let searchMatches = searchRes.filter(searchItem => {
        console.log(searchItem);
        const searchRegex = new RegExp(`^${searchText}`, 'gi');
        return searchItem.itemName.match(searchRegex);
    });
    if (searchText.length === 0) {
        searchMatches = [];
        searchMatchList.innerHTML = '';
    }
    
    outputSearchHtml(searchMatches);
};


const outputSearchHtml = searchMatches => {
    if (searchMatches.length > 0) {
        const html = searchMatches.map(searchMatch => `
        <div class ="card">
            <h4>${searchMatch.name}</h4>
        </div>
        `).join('');

        searchMatchList.innerHTML = html;
    }
}


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




