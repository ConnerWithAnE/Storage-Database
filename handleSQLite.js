/*
const searchItemBox = document.getElementById('search-input');
const insertItemBox = document.getElementById('insert-input-item');
const insertBoxBox = document.getElementById('input-insert-box');
const searchMatchList = document.getElementById('search-match-list');
const insertMatchList = document.getElementById('insert-match-list');
const insertBoxMatchList = document.getElementById('insert-box-match-list');
*/
const sqlite3 = require('sqlite3').verbose();

/*
const searchInput = document.getElementById('search-input');
const matchList = document.getElementById('match-list');
*/

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

/*
const data = new handleSQLite();

data.openDatabase();

data.closeDatabase();
*/








/*
let db = new sqlite3.Database('./db/storage.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the in memory SQlite database.')
    }
});
*/

let sqlItemSearchSuggest = `SELECT ItemName itemName
                            FROM   storage`

let sqlCreate = `CREATE TABLE storage(BoxNum REAL, ItemName TEXT, Location TEXT)`

let sqlInsert = "INSERT INTO storage VALUES(1, 'waffle maker', 'Storage Room')"




module.exports = handleSQLite;



/*

// Close the database
db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });


/*
const fs = require('fs');

//let data = fs.readFileSync('storage.json');
//let storage = JSON.parse(data);

//import { writeFile } from 'fs';

function insertData(obj) {
    const jsonData = JSON.stringify(obj);
    writeFile('storage.json', jsonData, function(error){
        if(error){
            console.error(error)
            return;
        }
    })
}
*/


/*****************************************************
// Search Suggestion System
const searchSearchItems = async searchText => {
    const searchRes = await fetch('../storage.json');
    const searchItems = await searchRes.json();

    console.log(searchItems);

    let searchMatches = searchItems.filter(searchItem => {
        console.log(searchItem);
        const searchRegex = new RegExp(`^${searchText}`, 'gi');
        return searchItem.name.match(searchRegex);
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

searchItemBox.addEventListener('input', () => searchSearchItems(searchItemBox.value));
// End of search Suggestion
/*****************************************************
// Insert Suggestion System
const searchInsertItems = async insertText => {
    const insertRes = await fetch('../storage.json');
    const insertItems = await insertRes.json();

    let insertMatches = insertItems.filter(insertItem => {
        const insertRegex = new RegExp(`^${insertText}`, 'gi');
        return insertItem.name.match(insertRegex);
    });
    if (insertText.length === 0) {
        insertMatches = [];
        insertMatchList.innerHTML = '';
    }
    
    outputInsertHtml(insertMatches);
};

const outputInsertHtml = insertMatches => {
    if (insertMatches.length > 0) {
        const insertHtml = insertMatches.map(insertMatch => `
        <div class ="card">
            <h4>${insertMatch.name}</h4>
        </div>
        `).join('');

        insertMatchList.innerHTML = insertHtml;
    }
}

insertItemBox.addEventListener('input', () => searchInsertItems(insertItemBox.value));
// End of insert Suggestion
/******************************************************/
/******************************************************/
// Box Suggestion System 
/*
const searchInsertBox = async boxText => {
    const boxRes = await fetch('../storage.json');
    const boxItems = await boxRes.json();

    let boxMatches = boxItems.filter(boxItem => {
        const boxRegex = new RegExp(`^${boxText}`, 'gi');
        return boxItem.box.match(boxRegex);
    });
    if (boxText.length === 0) {
        boxMatches = [];
        insertBoxMatchList.innerHTML = '';
    }
    
    outputInsertBoxHtml(boxMatches);
};

const outputInsertBoxHtml = boxMatches => {
    if (boxMatches.length > 0) {
        const boxHtml = boxMatches.map(boxMatch => `
        <div class ="card">
            <h4>${boxMatch.box}</h4>
        </div>
        `).join('');

        insertBoxMatchList.innerHTML = boxHtml;
    }
}

insertBoxBox.addEventListener('input', () => searchInsertBox(insertBoxBox.value));
*/
// End of Box Suggestion
/******************************************************/