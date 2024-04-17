//----------------------------------------------------------------------------
// product class
class Product {
    static id = 0;
    constructor(nume, cantitate) {
        this.id = ++Product.id;
        this.nume = nume;
        this.cantitate = cantitate;
    }
}
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// storage base class
class Storage {
    constructor() {
    }

    // addItem(product) {
    // }

    // updateItem(itemId, newItem) {
    // }

    // deleteItem(itemId) {
    // }

    // getAllItems() {
    // }
}
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// local storage class
class LocalStorage extends Storage{
    constructor(){
        super();
    }
}
LocalStorage.prototype.add = function saveProduct(product) {
    // Retrieve existing products from localStorage or initialize an empty array
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log('ciorba de gainaaaaaa');
    // Add the new product to the array
    products.push(product);

    // Save the updated array back to localStorage
    localStorage.setItem('products', JSON.stringify(products));
};
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// indexedDB class
class indexDB extends Storage{
    constructor(){
        super();
    }
}
indexDB.prototype.add = function(product){
    console.log('ciorba de vacuta indexata DBDBDBDBBD');
};


function shopping(){
    const worker = new Worker('js/worker.js');

    worker.addEventListener('message', function (event) {
        // Handle the message received from the worker
        const data = event.data;
        console.log('Received message from worker:', data);
        console.log('Received message type:', typeof(data));

        // Add a new row to the table with the data received from the worker
        let table = document.getElementById('shoppingTable');
        const row = table.insertRow(-1);
        const td1 = document.createElement('td');
        console.log(data.nume);
        td1.textContent = Product.id;
        row.appendChild(td1);

        const td2 = document.createElement('td');
        td2.textContent = data.nume;
        row.appendChild(td2);

        const td3 = document.createElement('td');
        td3.textContent = data.cantitate;
        row.appendChild(td3);
    });

    let btn = document.getElementById('adaugaBtn');
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        // Get input values
        const nume = document.getElementById('nume').value;
        const cantitate = parseInt(document.getElementById('cantitate').value);

        if (nume == "")
        {
            alert("Completează datele!");
            return;
        }
        if (typeof cantitate !== 'number' || isNaN(cantitate) || cantitate < 1)
        {
            alert("Nu este o cantitate validă!");
            return;
        }

        // Create a new Product object
        const product = new Product(nume, cantitate);

        worker.postMessage(product);

        // Save product to localStorage
        const locStor = new LocalStorage();
        locStor.add(product);

        // saveProduct(product);
    });

    let btnV2 = document.getElementById('adaugaBtnV2');
    btnV2.addEventListener('click', function (event){

        let db;
        const request = window.indexedDB.open("MyTestDatabase", 3);

        request.onerror = (event) => {
            // Do something with request.errorCode!
            console.error("Why didn't you allow my web app to use IndexedDB?!");
        };
        request.onsuccess = (event) => {
            // Do something with request.result!
            db = event.target.result;
            // const data = event.data;
            // console.log('Received message from worker:', data);
            // console.log('Received message type:', typeof (data));

            // // Add a new row to the table with the data received from the worker
            // let table = document.getElementById('shoppingTable');
            // const row = table.insertRow(-1);
            // const td1 = document.createElement('td');
            // console.log(data.nume);
            // td1.textContent = Product.id;
            // row.appendChild(td1);

            // const td2 = document.createElement('td');
            // td2.textContent = data.nume;
            // row.appendChild(td2);

            // const td3 = document.createElement('td');
            // td3.textContent = data.cantitate;
            // row.appendChild(td3);
        };
        db.onerror = (event) => {
            // Generic error handler for all errors targeted at this database's
            // requests!
            console.error(`Database error: ${event.target.errorCode}`);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create an objectStore to hold information about our customers. We're
            // going to use "ssn" as our key path because it's guaranteed to be
            // unique - or at least that's what I was told during the kickoff meeting.
            const objectStore = db.createObjectStore("produse", { keyPath: "id" });

            // Create an index to search customers by name. We may have duplicates
            // so we can't use a unique index.
            objectStore.createIndex("nume", "nume", { unique: false });

            // Create an index to search customers by email. We want to ensure that
            // no two customers have the same email, so use a unique index.
            objectStore.createIndex("cantitate", "cantitate", { unique: false });

            // Use transaction oncomplete to make sure the objectStore creation is
            // finished before adding data into it.
            objectStore.transaction.oncomplete = (event) => {
                // Store values in the newly created objectStore.
                const produseObjectStore = db
                    .transaction("produse", "readwrite")
                    .objectStore("produse");
                produseData.forEach((produs) => {
                    produseObjectStore.add(produs);
                });
            };
        };
    });
}



// Function to save product to localStorage
// function saveProduct(product) {
//     // Retrieve existing products from localStorage or initialize an empty array
//     let products = JSON.parse(localStorage.getItem('products')) || [];

//     // Add the new product to the array
//     products.push(product);

//     // Save the updated array back to localStorage
//     localStorage.setItem('products', JSON.stringify(products));
// }