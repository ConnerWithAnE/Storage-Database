'use strict'

const express = require('express');
const fs = require('fs');
const MongoClient = require ('mongodb').MongoClient;

const url = 'mongodb://toor:root@mongodbdatabase:27017'

const app = new express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))

let con;
MongoClient.connect(url, (err, db) => {
    con = db.db("mongodbdatabase");
})

const PORT = 8080;
const HOST = '0.0.0.0';

app.use('/', express.static('public'));


app.get('/createDatabase', (req, res) => {
    con.createCollection("storage", (err, result) => {
        if (err) throw err;
        console.log("Created Database");
    })
    res.send();
})

app.post('/searchItem', (req, res) => {
    const searchType = req.body.type;
    const searchValue = req.body.sInput;

    new Promise((resolve, reject) => {
        console.log(typeof(req.body.sInput));
        if (searchType == "item") {
            let query = {itemName: searchValue}
            con.collection("storage").find(query).toArray((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        } else {
            let query = {boxNum: searchValue}
            con.collection("storage").find(query).toArray((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }
    }).then((result) => {

        console.log("searched");

        if (req.body.type == "item") {
            if (result == []) {
                res.send(JSON.stringify({boxNum: null}));
            } else {
                Object.keys(result).forEach((key) => {
                        res.send(JSON.stringify(result[key]))
                })
            }
        } else {
            new Promise((resolve, reject) => {
                let resp;
                Object.keys(result).forEach((key) => {
                    resp += `\n${result[key].itemName}`;
                })
                resolve(resp);
            }).then((result) => {
                console.log(result);
                res.send(result);
            }).catch((error) => {
                console.log(error);
            })
        }
    }).catch((error) => {    
        console.log("searched BAD");

        console.log(error);
    })

});

app.post('/insertItem', (req, res) => {

    new Promise((resolve, reject) => {
        let query = {itemName: req.body.iInput};
        con.collection("storage").find(query).toArray((err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    }).then((result) => {
        new Promise((resolve, reject) => {
            Object.keys(result).forEach((key) => {
                if (result[key].itemName == req.body.iInput) {
                    reject();
                } 
            })
            resolve();
        }).then(() => {
            new Promise((resolve, reject) => {
                console.log(typeof(req.body.iInput));
                let query = {itemName: req.body.iInput, boxNum: req.body.bInput}
                con.collection("storage").insertOne(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }).then((result) => {
                console.log(result)
                res.send(JSON.stringify({}))
            }).catch((error) => {
                console.log(error);
            })
        }).catch(() => {
            res.send(JSON.stringify({code:1}));
        })

    }).catch((error) => {
        console.log(error);
    })

    
});

app.listen(PORT, HOST);
console.log("Server is up and running")








