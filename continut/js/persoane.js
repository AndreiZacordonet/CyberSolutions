function incarcaPersoane() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'persoane.xml');

    xhttp.onload = function () {
        if (xhttp.status === 200) {
            const xmlDoc = xhttp.responseXML;
            console.log(xmlDoc);

            const persons = xmlDoc.getElementsByTagName("persoana");
            console.log(persons); //textContent

            const section = document.getElementById('persTable');   //
            const table = document.createElement('table');      // table
            const row = table.insertRow(-1);
            for (let i = 1; i < persons[0].childNodes.length; i += 2)
            {
                const th = document.createElement('th');
                th.textContent = persons[0].childNodes[i].tagName.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, char => char.toUpperCase());
                row.appendChild(th);
            }

            for (let i = 0; i < persons.length; i++)
            {
                const row = table.insertRow(-1);

                for (let j = 1; j < persons[0].childNodes.length; j += 2)
                {
                    const td = document.createElement('td');
                    td.textContent = persons[i].childNodes[j].textContent;
                    row.appendChild(td);
                }
                
            }

            section.innerHTML = '';
            section.appendChild(table);
        } else {
            console.error('Error loading XML file');
        }
    };

    xhttp.send();
}