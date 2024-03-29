function displaySysDetails(){
    element = document.getElementById("oraData");
    element.innerHTML = Date();

    element = document.getElementById("URL");
    element.innerHTML = window.location.href;
    
    element = document.getElementById("location");
    element.innerHTML = navigator.watchPosition();
}

function headerTemplate(){
    const template = document.createElement('template');
    template.innerHTML = `
        <section id="numecompanie">
            <img src="favicon.ico" alt="Our Logo" title="Our Logo" height="147">
            <h1 style="margin-top: 0;">CyberSolutions</h1>
        </section>

        <nav>
            <a href="index.html">Acasă</a>
            <a href="despre.html">Despre</a>
            <a href="inregistreaza.html">Înregistrează-te</a>
            <a href="desen.html">Desene</a>
            <a href="video.html">Videoclipuri</a>
            <a href="invat.html">Învăț</a>
        </nav>
    `;
    element = document.getElementById('header')
    element.appendChild(template.content);
}

function footerTemplate(){
    const template = document.createElement('template');
    template.innerHTML = `
        <hr>    <!--this for the horizontal line-->
        <span>&copy; 2024. CyberSolutions. All rights reserved.</span>
    `;
    element = document.getElementById('footer');
    element.appendChild(template.content);
}