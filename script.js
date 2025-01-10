const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

const nameIndexedDB = 'indexedDB';
let request = window.indexedDB.open(nameIndexedDB, 4); 
let db;

request.onsuccess = (evt) => {
    db = evt.target.result;
    // console.log("Database created successfully!", db);
};

request.onerror = (err) => {
    console.log('something went wrong',err);
};

request.onupgradeneeded = (evt) => {
    db = evt.target.result;
    if(!(db.objectStoreNames.contains('table'))) db.createObjectStore('table', {keyPath: 'id', autoIncrement: true}) 
};

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let file = elInput.files[0];
    try{
        if(!file) throw new Error('File kiritish majburiy!'); 
        let transaction = db.transaction('table', 'readwrite');
        let store = transaction.objectStore('table');

        let reader = new FileReader();
        reader.onload = () => {
            file = {
                file_name: file.name,
                content: reader.result
            } ; 
            store.add(file);                      
        }
        reader.readAsDataURL(file);
        
    } catch(err){
        return alert(err.message);
    }
})