const http = require('http');
const fs = require('fs');
const port = 8080;



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

    // Handle javascript request
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

    else if (req.url === '/storage.json') {
        res.writeHead(200, { 'Content-Type': 'application/json'})
          fs.readFile('storage.json', function(error, data) {
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

    
});


// Open the port to listen to
server.listen(port, '172.16.1.80' || 'localhost', function(error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});




