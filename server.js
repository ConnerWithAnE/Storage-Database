
const handleSQLite = require('./handleSQLite');

const express = require('express');
const fs = require('fs');

const app = new express();

app.listen(8080);
app.use(express.static('public'));

const dataBase = new handleSQLite();
      dataBase.openDatabase();


app.use(express.json({limit: '1mb'}));

let sendBack;
const sendBackItems = [];
app.post('/search-input', (req, response) => {
    const searchType = req.body.type;
    const searchValue = req.body.sInput;
    
    if (searchType == "item") {
        dataBase.db.serialize(() => {
        dataBase.db.get(`SELECT BoxNum FROM storage WHERE ItemName=$itemname`, {
            $itemname: searchValue },
            (err, row) => {
            if (err) throw err;
            sendBack = row.BoxNum;
        });
        
    })}
    else if (searchType == "box") {
        dataBase.db.each(`SELECT ItemName FROM storage WHERE BoxNum=$boxnum`, {
            $boxnum: Number(searchValue) },
            (err, row) => {
            if (err) throw err;
            sendBackItems.push(row.ItemName);
        });
        response.json({
            items: sendBackItems
        });
    }
    else {
        response.end();
    }
    response.json({
        boxnum: `${sendBack}`
    })
    //console.log(typeof req.body.sInput);
    //console.log(sendBackItems);
    //console.log(sendBack);
    //console.log("HELLO");
    //response.json({})
});

function checkExistence(item, boxNum) {
    if (dataBase.db.run(`SELECT EXISTS(SELECT 1 FROM storage WHERE ItemName = ${item})`).fetchone()) {
        dataBase.db.run(`UPDATE storage SET BoxNum = ${boxNum} WHERE ItemName = ${item}`);
    } else {
        dataBase.db.run(`INSERT INTO storage VALUES(${boxNum}, ${item}, 'Storage Room')`);
    }
}


let sqlCreate = `CREATE TABLE storage(BoxNum REAL, ItemName TEXT, Location TEXT)`


//dataBase.db.run(`INSERT INTO storage VALUES(3, 'cheese', 'Storage Room')`)

dataBase.db.all(`SELECT ItemName
                 FROM   storage`, (err, rows) => {
                     if (err) throw err;

                     fs.writeFile('public/pass.json', JSON.stringify(rows), err => {
                         if (err) throw err

                         console.log("Pass Filled");
                     });
                 });









