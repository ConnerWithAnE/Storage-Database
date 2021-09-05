
const sqlite3 = require('sqlite3').verbose();

class handleSQLite {
    constructor() {
        this.db;
    }


    openDatabase() {
        this.db = new sqlite3.Database('./db/storage.db', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Connected to the in memory SQlite database.')
            }
        });
        return console.log("success");
    }

    closeDatabase() {
        this.db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Close the database connection.');
          });
    }
    
}



let sqlItemSearchSuggest = `SELECT ItemName itemName
                            FROM   storage`

let sqlCreate = `CREATE TABLE storage(BoxNum REAL, ItemName TEXT, Location TEXT)`

let sqlInsert = "INSERT INTO storage VALUES(1, 'waffle maker', 'Storage Room')"




module.exports = handleSQLite;



