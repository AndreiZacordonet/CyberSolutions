// Define a class for Product
class Product {
    constructor(id, nume, cantitate) {
        this.id = id;
        this.nume = nume;
        this.cantitate = cantitate;
    }
}

// Add event listener for the "Adaugă" button
function shopping(){
    let btn = document.getElementById('adaugaBtn');
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        // Get input values
        const nume = document.getElementById('nume').value;
        const cantitate = document.getElementById('cantitate').value;

        // Generate unique id for the product (you can use a more robust method)
        const id = new Date().getTime();

        // Create a new Product object
        const product = new Product(id, nume, cantitate);

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

    // Optionally, you can display a message or perform any other actions here
}