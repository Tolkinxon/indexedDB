const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

const nameIndexedDB = 'indexedDB';
let request = window.indexedDB.open(nameIndexedDB, 2); 
let db;

request.onsuccess = (evt) => {
    db = evt.target.result;
    console.log("Database created successfully!", db);
    
}

request.onerror = (err) => {
    console.log('something went wrong',err);
}

request.onupgradeneeded = (evt) => {
    db = evt.target.result;
    if(!(db.objectStoreNames.contains('table'))) db.createObjectStore('table', {keyPath: 'id'}) 
    
}





elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
})