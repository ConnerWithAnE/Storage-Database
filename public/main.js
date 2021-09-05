'use strict'

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

let save;

document.getElementById('search-go-btn').addEventListener('click', function(e) {
    let inBox;
    e.preventDefault();
    if (searchInput.placeholder == ""){
        alert("Must Select Search Type { Box OR Item }");
        return;
    } else {
        const searchinp = searchInput.value;
        if (searchInput.placeholder == "Item Name") {
            const data = {"sInput": searchinp, 
                          "type" : "item"};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch('/search-input', options).then(response => {
                console.log(response.json().body.items);

            });
                /*
                document.querySelector(".search-result-con").classList.remove('hidden');


                if (boxnum != null) {
                    document.querySelector('.search-result').innerHTML = 
                    document.getElementById('search-remove-btn').classList.remove('hidden');
                }
                */
            
        }
            
        else if (searchInput.placeholder == "Box Number") {
            const data = {"sInput": searchinp, 
                          "type" : "box"};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            fetch('/search-input', options).then(response => {
                console.log(response.json()[[PromiseResult]].items);
            });
        };
    }

})



document.getElementById('search-remove-btn').addEventListener('click', function(e) {
    e.preventDefault();
});
const insertForm = document.getElementById('insert-form');
const insertInputItem = document.getElementById('insert-input-item');
const insertInputBox = document.getElementById('input-insert-box');


document.getElementById('insert-go-btn').addEventListener('click', function(e) {
    e.preventDefault();

    if (insertInputItem.value == "") alert("Must Input Item Name")
    else if (insertInputBox.value == "") alert("Must Input Box Number");
    
    else {
        const insertIteminp = insertInputItem.value;
        const insertBoxinp = insertInputBox.value;
        
            const data = {"iInput": insertIteminp, 
                          "bInput": insertBoxinp
                        };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            fetch('/insert-input', options)
            /*.then(response => {
                console.log(response.json().boxnum);
            });*/
         
    }
})





// Search Button Controller
document.querySelector('.search').addEventListener('click', function() {
    document.querySelector('.search-sec').classList.remove('hidden');
    document.querySelector('.insert').classList.add('hidden');
    document.querySelector('.remove').classList.add('hidden');
    document.querySelector('.btns').classList.add('bts-search-clicked');
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
    document.querySelector('.remove').classList.add('hidden');
    document.querySelector('.btns').classList.add('bts-insert-clicked');
    document.body.style.backgroundColor = "#BAE1C4";
    console.log('insert clicked');
});

// Remove Button Controller
document.querySelector('.remove').addEventListener('click', function() {
    
    document.querySelector('.search').classList.add('hidden');
    document.querySelector('.insert').classList.add('hidden');
    document.querySelector('.btns').classList.add('bts-remove-clicked');
    document.body.style.backgroundColor = "#BAE1FF";
    console.log('remove clicked');
});


