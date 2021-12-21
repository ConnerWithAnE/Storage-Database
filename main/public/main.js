'use strict'


const searchForm = document.getElementById('search-form');

let searchType;

function setBoxSearch() {
    searchType = "box";
}

function setItemSearch() {
    searchType = "item";
}


function searchItem() {

    if (searchType == null) {
        alert("Must select type of search")
        return
    } else if (document.getElementById('search-input').value == null) {
        alert("Must Give Input")
        return
    }
    let http = new XMLHttpRequest();
    let url = '/searchItem';

    console.log(searchType);

    let postData = `sInput=${document.getElementById('search-input').value}&type=${searchType}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {

            document.querySelector('.search-result-con').classList.remove('hidden');
    
            if (searchType == "item") {
                let response = JSON.parse(http.responseText);
                if (response.boxNum == null) {
                    document.getElementById("search-result").innerHTML = `<p>Item Does Not Exist</p>`;
                } else if (response.boxNum == "removed") {
                    document.getElementById("search-result").innerHTML = `<p>Item Has Been Removed</p>`;
                } else {
                    document.getElementById("search-result").innerHTML = `<p>Box ${response.boxNum}</p>`;
                }
            } else{
                let response = http.responseText;
                let vals = response.split(/\n/);
                vals.shift();
                let values = vals.slice().map(val =>
                    `<p>${vals.indexOf(val) + 1}. ${val}</p>`
                ).join('');

                document.getElementById("search-result").innerHTML = values;
            }

        }

    }
    http.send(postData);

}

function insertItem() {

    if (document.getElementById('insert-input-item').value == "") {
        alert("Must Input Item Name");
        return
    }
    if (document.getElementById('insert-input-box').value == "") {
        alert("Must Input Box Number");
        return
    }

    let http = new XMLHttpRequest();
    let url = '/insertItem';

    let postData = `iInput=${document.getElementById('insert-input-item').value}&bInput=${document.getElementById('insert-input-box').value}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            let response = JSON.parse(http.responseText)

            if (response.code == 1) {
                alert("Item is already in database");
            }

        }

    }
    http.send(postData);

}


document.getElementById('search-remove-btn').addEventListener('click', function(e) {
    e.preventDefault();
});
const insertForm = document.getElementById('insert-form');
const insertInputItem = document.getElementById('insert-input-item');
const insertInputBox = document.getElementById('input-insert-box');








// Search Button Controller
document.querySelector('.search').addEventListener('click', function() {
    document.querySelector('.search-sec').classList.remove('hidden');
    document.querySelector('.search').classList.add('hidden');
    document.querySelector('.searchTitle').classList.remove('hidden');
    document.querySelector('.insert').classList.add('hidden');
    document.querySelector('.remove').classList.add('hidden');
    document.querySelector('.extraPanel').classList.add('hidden');
    document.querySelector('.btns').classList.add('hidden');
    document.body.style.backgroundColor = "#FFB3E9";

    console.log('search clicked');
});

// Search Box Controller
document.querySelector('#box-search').addEventListener('click', function() {
   
    document.querySelector('#box-search').classList.add('search-sec-green');

    document.querySelector('#item-search').classList.remove('search-sec-green');
    document.getElementById('search-input').placeholder = "Box Number";
});

// Search Item Controller
document.querySelector('#item-search').addEventListener('click', function() {
   
    document.querySelector('#item-search').classList.add('search-sec-green');

    document.querySelector('#box-search').classList.remove('search-sec-green');
    document.getElementById('search-input').placeholder = "Item Name";
});


// Insert Button Controller
document.querySelector('.insert').addEventListener('click', function() {
    document.querySelector('.insert-sec').classList.remove('hidden');
    document.querySelector('.search').classList.add('hidden');
    document.querySelector('.insert').classList.add('hidden');
    document.querySelector('.insertTitle').classList.remove('hidden');
    document.querySelector('.remove').classList.add('hidden');
    document.querySelector('.extraPanel').classList.add('hidden');
    document.querySelector('.btns').classList.add('hidden');
    document.body.style.backgroundColor = "#BAE1C4";
    console.log('insert clicked');
});

// Remove Button Controller
document.querySelector('.remove').addEventListener('click', function() {
    
    document.querySelector('.search').classList.add('hidden');
    document.querySelector('.insert').classList.add('hidden');
    document.querySelector('.extraPanel').classList.add('hidden');
    document.querySelector('.btns').classList.add('bts-remove-clicked');
    document.body.style.backgroundColor = "#BAE1FF";
    console.log('remove clicked');
});


