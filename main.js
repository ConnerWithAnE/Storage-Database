'use strict'


document.querySelector('.search').addEventListener('click', function() {
    document.querySelector('.search-sec').classList.remove('hidden');
    document.querySelector('.insert').classList.add('hidden');
    document.querySelector('.remove').classList.add('hidden');
    document.querySelector('.btns').classList.add('bts-search-clicked');
    document.body.style.backgroundColor = "#FFB3E9";
    //document.querySelector('.insert').classList.add('.search-clicked');
    //document.querySelector('.insert').style.position = 'absolute';
    //document.querySelector('.insert').style.bottom = '-500px';
    console.log('search clicked');
});

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
    //document.querySelector('.insert-sec').classList.remove('hidden');
    document.querySelector('.search').classList.add('hidden');
    document.querySelector('.insert').classList.add('hidden');
    document.querySelector('.btns').classList.add('bts-remove-clicked');
    document.body.style.backgroundColor = "#BAE1FF";
    console.log('remove clicked');
});