//  const elInput = document.querySelector('.js-input');
// const elList = document.querySelector('.js-list');

// const nameIndexedDB = 'indexedDB';
// let request = window.indexedDB.open(nameIndexedDB, 5); 
// let db;

// function render() {
//     let transaction = db.transaction('table', 'readonly');
//     let store = transaction.objectStore('table');
//     let files = store.getAll();

//     files.onsuccess = (res) => {
//         res = res.srcElement.result;
        
//         elList.innerHTML = '';
//         res.forEach(({file_name, content}) => {
//             const li = document.createElement('li');
//             if(content.startsWith('data:image')){
//                 const img = document.createElement('img');
//                 img.src = content; 
//                 li.append(img)
//                 elList.append(li)
//             }
//             else if(content.startsWith('data:video')){
//                 const video = document.createElement('video');
//                 video.controls = true;
//                 video.autoplay = true;
//                 video.src = content; 
//                 li.append(img)
//                 elList.append(li)
//             }
//             else {
//                 const a = document.createElement('a');
//                 a.href = content; 
//                 a.download = file_name;
//                 a.textContent = 'Download file ' + file_name;
//                 li.append(a)
//                 elList.append(li)
//             }
//         });
        
//     }
    
// }

// request.onsuccess = (evt) => {
//     db = evt.target.result;
//     return render()
// };

// request.onerror = (err) => {
//     console.log('something went wrong',err);
// };

// request.onupgradeneeded = (evt) => {
//     db = evt.target.result;
//     if(!(db.objectStoreNames.contains('table'))) db.createObjectStore('table', {keyPath: 'id', autoIncrement: true}) 
// };

// elInput.addEventListener('change', (evt) => {
//     evt.preventDefault();
//     let file = evt.target.files[0];
//     try{
//         if(!file) throw new Error('File kiritish majburiy!'); 
//         let reader = new FileReader();
//         reader.onload = () => {
//             if(db && db.objectStoreNames.contains('table')){
//                 let transaction = db.transaction('table', 'readwrite');
//                 let store = transaction.objectStore('table');

//                 if(store && transaction) {
//                     file = {
//                         file_name: file.name,
//                         content: reader.result
//                     } ; 
//                     store.add(file);  
//                     console.log('Fiile created successfully!');
//                     render();
                    
//                 } 
//             }
//         }
//         reader.readAsDataURL(file);
        
//     } catch(err){
//         return alert(err.message);
//     }
// })










const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list'); 

const req = window.indexedDB.open('fruits', 8);
let db;

req.onsuccess = (evt) => {
    db = evt.target.result;
    console.log('Data base created successfully!', db);
}

req.onerror = (err) => {
    console.log('Semething went wrong!', err);
}

req.onupgradeneeded = (evt) => {
    db = evt.target.result;
    if(!(db.objectStoreNames.contains('fruit'))) db.createObjectStore('fruit',{keyPath: 'id', autoIncrement: true});
    console.log('Data base updated successfully!', db);
}

elInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    let file = evt.target.files[0];

    try{
        if(!file) throw Error('File kiritish majburiy');
        
        let reader = new FileReader();
        reader.onload = () => {
            if(db && db.objectStoreNames.contains('fruit')){
                let transaction = db.transaction('fruit', 'readwrite');
                let store = transaction.objectStore('fruit');
            }
            
        }

        reader.readAsDataURL(file)

    } catch(err){
        return alert(err.message)
    }
})

