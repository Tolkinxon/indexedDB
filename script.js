const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

const nameIndexedDB = 'indexedDB';
let request = window.indexedDB.open(nameIndexedDB, 1); 
let db;

request.onsuccess = (evt) => {
    db = evt.target.result;
}

request.onerror = (err) => {
    console.log(err);
    
}

request.onupgradeneeded = (evt) => {
    db = evt.target.result;
}





elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // console.dir(elInput.files[0]);
    console.log(window);

    const reader = new FileReader();

    reader.readAsDataURL(elInput.files[0])


    
    
})