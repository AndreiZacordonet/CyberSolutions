function displaySysDetails(){
    element = document.getElementById("oraData");
    element.innerHTML = Date();

    element = document.getElementById("URL");
    element.innerHTML = window.location.href;
    
    element = document.getElementById("location");
    element.innerHTML = navigator.watchPosition();
}