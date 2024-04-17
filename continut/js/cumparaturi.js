// Define a class for Product
class Product {
    static id = 0;
    constructor(nume, cantitate) {
        this.id = ++Product.id;
        this.nume = nume;
        this.cantitate = cantitate;
    }
}


function shopping(){
    const worker = new Worker('js/worker.js');

    worker.addEventListener('message', function (event) {
        // Handle the message received from the worker
        const data = event.data;
        console.log('Received message from worker:', data);
        console.log('Received message type:', typeof(data));

        // Add a new row to the table with the data received from the worker
        // addRowToTable(data);

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
        saveProduct(product);
    });
}



// Function to save product to localStorage
function saveProduct(product) {
    // Retrieve existing products from localStorage or initialize an empty array
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Add the new product to the array
    products.push(product);

    // Save the updated array back to localStorage
    localStorage.setItem('products', JSON.stringify(products));
}