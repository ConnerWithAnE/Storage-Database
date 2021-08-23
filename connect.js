'use strict'



/*
// Open the database in memory
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/storage.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the in memory SQlite database.')
    }
});


// Close the database
db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });

*/
document.querySelector('.search').addEventListener('click', function() {
     console.log('search clicked');
});

document.querySelector('.insert').addEventListener('click', function() {
    console.log('insert clicked');
});

document.querySelector('.remove').addEventListener('click', function() {
    console.log('remove clicked');
});