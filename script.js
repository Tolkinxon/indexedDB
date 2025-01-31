 const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

const nameIndexedDB = 'indexedDB';
let request = window.indexedDB.open(nameIndexedDB, 9); 
let db;

function render() {
    let transaction = db.transaction('table', 'readonly');
    let store = transaction.objectStore('table');
    let files = store.getAll();
    let keys = store.getAllKeys();

    files.onsuccess = (res) => {
        keys.onsuccess = () => {
            res = res.srcElement.result;
            keyArr = keys.result;

            elList.innerHTML = '';
            res.forEach(({file_name, content, file_id}, idx) => {
                const li = document.createElement('li');
                if(content.startsWith('data:image')){
    
                    const btn = document.createElement('button');
                    btn.textContent = 'x'
                    btn.dataset.id = keyArr[idx];
                    btn.classList.add('delete')
                    li.append(btn)
                    
                    const img = document.createElement('img');
                    img.src = content; 
                    li.append(img)
                    elList.append(li)
                }
                else if(content.startsWith('data:video')){
                    const video = document.createElement('video');
                    video.controls = true;
                    video.autoplay = true;
                    video.src = content; 
                    li.append(img)
                    elList.append(li)
                }
                else {
                    const a = document.createElement('a');
                    a.href = content; 
                    a.download = file_name;
                    a.textContent = 'Download file ' + file_name;
                    li.append(a)
                    elList.append(li)
                }
            });
        }
    
        
    }
    
}

request.onsuccess = (evt) => {
    db = evt.target.result;
    return render()
};

request.onerror = (err) => {
    console.log('something went wrong',err);
};

request.onupgradeneeded = (evt) => {
    db = evt.target.result;
    if(!(db.objectStoreNames.contains('table'))) db.createObjectStore('table', {keyPath: 'id', autoIncrement: true}) 
};

elInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    let file = evt.target.files[0];
    try{
        if(!file) throw new Error('File kiritish majburiy!'); 
        let reader = new FileReader();
        reader.onload = () => {
            if(db && db.objectStoreNames.contains('table')){
                let transaction = db.transaction('table', 'readwrite');
                let store = transaction.objectStore('table');

                if(store && transaction) {
                    file = {
                        file_name: file.name,
                        content: reader.result
                    } ; 
                    store.add(file);
                    console.log(file.content);
                      
                    console.log('Fiile created successfully!');
                    render();
                } 
            }
        }
        reader.readAsDataURL(file);
        
    } catch(err){
        return alert(err.message);
    }
})

elList.addEventListener('click', (evt)=>{
    if(evt.target.matches('.delete')) {
        const id = evt.target.dataset.id;
        if(db && db.objectStoreNames.contains('table')){
            let transaction = db.transaction('table', 'readwrite');
            let store = transaction.objectStore('table');

            if(store && transaction) {
                
                store.delete(Number(id));
                
                console.log('File deleted successfully!');
                render();
            } 
        }
        
    }
    
})







