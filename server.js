
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
app.post('/search-input', async (req, response) => {
    const searchType = req.body.type;
    const searchValue = req.body.sInput;
    //console.log(searchValue);
    if (searchType == "item") {
        itemQuery(searchValue);
        await new Promise(r => setTimeout(r, 100));
        response.json({
            boxnum: `${sendBack}`
        })    
        console.log(sendBack);
    }
    else if (searchType == "box") {
        boxQuery(searchValue);
        await new Promise(r => setTimeout(r, 100));
        response.json({
            items: sendBackItems
        });
        console.log(sendBackItems)
    }
    
    });
    //console.log(typeof req.body.sInput);
    //console.log(sendBackItems);
    //console.log(sendBack);
    //console.log("HELLO");
    //response.json({})


app.post('/insert-input', (req, response) => {
    const insertI = req.body.iInput;
    const insertB = req.body.bInput;

    console.log(dataBase.db.run(`SELECT BoxNum FROM storage WHERE EXISTS (SELECT * FROM storage WHERE ItemName = "${insertI})`));
    
    /*if (dataBase.db.run(`SELECT BoxNum FROM storage WHERE EXISTS (SELECT * FROM storage WHERE ItemName = ${insertI})`) != null) {
        dataBase.db.run(`UPDATE storage SET BoxNum = ${insertB} WHERE ItemName = ${insertI}`);
    } else {
        dataBase.db.run(`INSERT INTO storage VALUES(${insertB}, ${insertI}, 'Storage Room')`);
    }*/
});










async function boxQuery(val) {
    dataBase.db.serialize(() => {
        dataBase.db.each(`SELECT ItemName FROM storage WHERE BoxNum=$boxnum`, {
            $boxnum: val },
            (err, row) => {
            if (err) throw err;
            sendBackItems.push(row.ItemName);
        })
    })};

async function itemQuery(val) {
    dataBase.db.serialize(() => {
        dataBase.db.get(`SELECT BoxNum FROM storage WHERE ItemName=$itemname`, {
            $itemname: val },
            (err, row) => {
            if (err) throw err;
            sendBack = row.BoxNum;
        });
        
    })}; 



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









