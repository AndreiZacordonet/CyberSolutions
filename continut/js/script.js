function headerTemplate(){
    const template = document.createElement('template');
    template.innerHTML = `
        <section id="numecompanie">
            <img src="imagini/jpg-pt-favicon.jpg" alt="Our Logo" title="Our Logo" height="147">
            <h1 style="margin-top: 0;">CyberSolutions</h1>
        </section>

        <nav class="flex-container">
            <a onclick="schimbaContinut('acasa')">Acasă</a>
            <a onclick="schimbaContinut('despre')">Despre</a>
            <a onclick="schimbaContinut('inregistreaza')">Înregistrează-te</a>
            <a onclick="schimbaContinut('desen')">Desene</a>
            <a onclick="schimbaContinut('video')">Videoclipuri</a>
            <a onclick="schimbaContinut('invat', 'initialLoad', 'js/script.js')">Învăț</a>
        </nav>

        <!-- <button onclick="toggleDropdown()">Meniu</button> -->

        <aside class="sidebar" id="aside">
            <h2 >News</h2>
        </aside>
    `;
    element = document.getElementById('header');
    element.appendChild(template.content);
}

//sidebar template
// function asideTemplate(){
//     const template = document.createElement('template');
//     template.innerHTML = `
//         <h2 style="text-align: center;">News</h2>
//     `;
//     element = document.getElementById('aside');
//     element.appendChild(template.content);
// }

// OLD FUNCTION (NAV WITHOUT AJAX)
// function headerTemplate(){
//     const template = document.createElement('template');
//     template.innerHTML = `
//         <section id="numecompanie">
//             <img src="favicon.ico" alt="Our Logo" title="Our Logo" height="147">
//             <h1 style="margin-top: 0;">CyberSolutions</h1>
//         </section>

//         <nav>
//             <a href="index.html">Acasă</a>
//             <a href="despre.html">Despre</a>
//             <a href="inregistreaza.html">Înregistrează-te</a>
//             <a href="desen.html">Desene</a>
//             <a href="video.html">Videoclipuri</a>
//             <a href="invat.html">Învăț</a>
//         </nav>
//     `;
//     element = document.getElementById('header')
//     element.appendChild(template.content);
// }

function footerTemplate(){
    const template = document.createElement('template');
    template.innerHTML = `
        <nav id="main-menu">
            <a onclick="schimbaContinut('acasa')">Acasă</a>
            <a onclick="schimbaContinut('despre')">Despre</a>
            <a onclick="schimbaContinut('inregistreaza')">Înregistrează-te</a>
            <a onclick="schimbaContinut('desen')">Desene</a>
            <a onclick="schimbaContinut('video')">Videoclipuri</a>
            <a onclick="schimbaContinut('invat')">Învăț</a>
        </nav>
        <div class="social-icons">
            <a href="https://www.linkedin.com/" class="social"><img src="imagini/linkedin-icon.jpg" alt="LinkedIn"></a>
            <a href="https://www.facebook.com/" class="social"><img src="imagini/facebook-icon.jpg" alt="Facebook"></a>
        </div>
        <div style="padding-left: 20px;">&copy; 2024. CyberSolutions. All rights reserved.</div>
    `;
    element = document.getElementById('footer');
    element.appendChild(template.content);
}

//--------------------------------------------------------------------------------------------------------------//

function initialLoad() {
    // date time info
    window.savedInterval = setInterval(() => {
        document.getElementById('oraData').innerHTML =  new Date().toLocaleString();;
    }, 1000);
    // rest of data
    displayAllInfo();
}

function displayAllInfo() {
    // URL address
    document.getElementById('URL').innerHTML = window.location.href;

    // operating system data
    document.getElementById('so').innerHTML = /\(([^)]+)\)/.exec(window.navigator.userAgent)[1];

    // browser data
    document.getElementById('browser').innerHTML = window.navigator.userAgent.replace(/ *\([^)]*\)*/g, "");

    // location data
    navigator.geolocation.getCurrentPosition((position) => {
                    document.getElementById("location").innerHTML = 
                    "<br>Latitude: " + position.coords.latitude + 
                    "<br>Longitude: " + position.coords.longitude;});
}

// ajax fun
function schimbaContinut(file, jsFun, jsFile) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("continut").innerHTML = this.responseText;

        let script = document.createElement('script');
        if (jsFun && jsFile)
        {
            script.src = jsFile;
            script.onload = function(){
                window[jsFun]();
            };
            document.body.appendChild(script);
        }
    };
    xhttp.open("GET", file + '.html');
    xhttp.send();
}
