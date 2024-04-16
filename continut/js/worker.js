self.addEventListener('message', function (event) {
    // Extract data from the message
    const nume = event.data.nume;
    const cantitate = event.data.cantitate;

    // Log a message to the console
    console.log(`Received message from main script: Nume: ${nume}, Cantitate: ${cantitate}`);

    // Notify the main script
    self.postMessage(event.data);
});

