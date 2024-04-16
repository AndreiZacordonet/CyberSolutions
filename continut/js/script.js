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
            <a onclick="schimbaContinut('persoane', 'incarcaPersoane', 'js/persoane.js')">Persoane</a>
            <a onclick="schimbaContinut('verifica', 'verifyUsers', 'js/script.js')">Login</a>
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
            <a onclick="schimbaContinut('invat', 'initialLoad', 'js/script.js')">Învăț</a>
            <a onclick="schimbaContinut('persoane', 'incarcaPersoane', 'js/persoane.js')">Persoane</a>
            <a onclick="schimbaContinut('verifica', 'verifyUsers', 'js/script.js')">Login</a>
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
// system details
{
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
}
//--------------------------------------------------------------------------------------------------------------//
// canva
{
    let isDrawing = false;
    let startX = 0, startY = 0;
    let endX = 0, endY = 0;

    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    context.lineWidth = 5;

    canvas.addEventListener("mousedown", function(event) {
        const rect = canvas.getBoundingClientRect();
        if (!isDrawing) {
            startX = event.clientX - rect.left;
            startY = event.clientY - rect.top;
            isDrawing = true;
        } else {
            endX = event.clientX - rect.left;
            endY = event.clientY - rect.top;
            drawRectangle(startX, startY, endX, endY);
            isDrawing = false;
        }
    });

    canvas.addEventListener("mouseleave", function() {
        isDrawing = false;
    });

    document.getElementById("erase").addEventListener("click", function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    })

    function drawRectangle(x1, y1, x2, y2) {
        const width = x2 - x1;
        const height = y2 - y1;
        context.strokeStyle = document.getElementById("extColor").value;
        context.strokeRect(x1, y1, width, height);
        context.fillStyle = document.getElementById("intColor").value;
        context.fillRect(x1, y1, width, height);
    }
}

//--------------------------------------------------------------------------------------------------------------//
// dynamic tabel 
{
    document.getElementById('row').addEventListener('click', function(){
        try{
            const index = parseInt(document.getElementById('number').value);
            if (typeof index !== 'number' || index === "")
            {
                throw new Error('Not a number');
            }

            const color = document.getElementById('color').value;
            const table = document.getElementById('dynamicTable');
            console.log(index + typeof(index));
            const row = table.insertRow(index);
            
            for(let i = 0; i < table.rows[index == 1 ? index-1:1].cells.length; i++){
                let cell = row.insertCell(i);
                cell.innerHTML = "";
                cell.style.backgroundColor = color;
                cell.style.color = getComplementaryColor(color);
                cell.contentEditable = true;
            }
        }
        catch (error){
            alert(error);
        }
    })

    document.getElementById('column').addEventListener('click', function(){
        try{
            const index = parseInt(document.getElementById('number').value);
            if (typeof index !== 'number' || index === "")
            {
                throw new Error('Not a number');
            }

            const color = document.getElementById('color').value;
            const table = document.getElementById('dynamicTable');

            for(let i = 0; i < table.rows.length; i++){
                console.log(i + "index: " + index);
                let cell = table.rows[i].insertCell(index);
                cell.innerHTML = "";
                cell.style.backgroundColor = color;
                cell.style.color = getComplementaryColor(color);
                cell.contentEditable = true;
            }
        }
        catch (error){
            alert(error);
        }
    })

    function getComplementaryColor(color) {
        // Remove # if present
        color = color.replace('#', '');
    
        // Convert color to RGB
        const hexToRgb = (hex) => hex.match(/.{2}/g).map((c) => parseInt(c, 16));
        const rgb = hexToRgb(color);
    
        // Calculate complementary color
        const complementaryColor = rgb.map((c) => 255 - c);
    
        // Convert RGB to hex
        const rgbToHex = (rgb) => rgb.map((c) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0')).join('');
        const complementaryHex = rgbToHex(complementaryColor);
    
        return '#' + complementaryHex;
    }
}

//--------------------------------------------------------------------------------------------------------------//
// ajax fun MAIN
function schimbaContinut(file, jsFun, jsFile) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("continut").innerHTML = this.responseText;

        // let script = document.createElement('script');

        if (jsFile) {
            let elementScript = document.createElement('script');
            elementScript.onload = function () {
                console.log("hello");
                if (jsFun) {
                    window[jsFun]();
                }
            };
            elementScript.src = jsFile;
            document.head.appendChild(elementScript);
        } else {
            if (jsFun) {
                window[jsFun]();
            }
        }
        // if (jsFun && jsFile)
        // {
        //     script.src = jsFile;
        //     script.onload = function(){
        //         window[jsFun]();
        //     };
        //     document.body.appendChild(script);
        // }
    };

    history.replaceState(null, document.title, window.location.pathname + window.location.search); // removing the #sectionID from URL
    xhttp.open("GET", file + '.html');
    xhttp.send();
}

//--------------------------------------------------------------------------------------------------------------//
// ajax verify users
function verifyUsers() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'utilizatori.json');

    xhttp.onload = function () {
        if (xhttp.status === 200) {
            const jsonDoc = JSON.parse(xhttp.responseText);
            
            document.getElementById('credCheck').addEventListener('click', function () {
                let user = document.getElementById('usernameV').value;
                let pass = document.getElementById('passwordV').value;
                for (let i = 0; i < jsonDoc.length; i ++)
                {
                    if (jsonDoc[i].utilizator === user && jsonDoc[i].parola === pass)
                    {
                        let result = document.getElementById('loginResult');
                        result.style.color = 'green';
                        result.innerHTML = `User verificat cu succes!`;
                    }
                    else{
                        let result = document.getElementById('loginResult');
                        result.style.color = 'red';
                        result.innerHTML = `Username sau parolă greșită!`;
                    }
                }
                
            });
            
        } else {
            console.error('Error loading XML file');
        }
    };

    xhttp.send();

}
