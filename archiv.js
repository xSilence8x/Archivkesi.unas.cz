function getGetDataPath() {
    return './getData.php';
}

function nacti() {
    // Ajax request - připojí se do databáze přes PHP a vrátí data
    // nacti() je volána v HTML v <body onload="nacti()">
    const xhr = new XMLHttpRequest();
    xhr.open("GET", getGetDataPath(), true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            renderDataByType(data);
        }
    };
    xhr.send();
}


const mymap = L.map(
    'map',
    { center: [49.1744092, 16.5795631],
      zoom: 12,
    },
);

    /* ZÁKLADNÍ MAPA */
const openStreet = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        name: 'Základní',
    }).addTo(mymap);


    /* LETECKÁ MAPA */
const google = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 21,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,',
    name: 'Letecká',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
});

// založí ikonky 
const tradickaIcon = new L.icon({iconUrl: 'img/tradicka.png',iconSize: [20, 20]}),
    mysteryIcon = new L.icon({iconUrl: 'img/mystery.png',iconSize: [20, 20]}),
    wherigoIcon = new L.icon({iconUrl: 'img/wherigo.png',iconSize: [20, 20]}),
    multiIcon = new L.icon({iconUrl: 'img/multi.png',iconSize: [20, 20]}),
    letterboxIcon = new L.icon({iconUrl: 'img/letterbox.png',iconSize: [20, 20]}),
    virtualIcon = new L.icon({iconUrl: 'img/virtual.png',iconSize: [20, 20]}),
    webcamIcon = new L.icon({iconUrl: 'img/webcam.png',iconSize: [20, 20]}),
    earthIcon = new L.icon({iconUrl: 'img/earth.png',iconSize: [20, 20]});


const baseLayers = {
    'Základní': openStreet,    
    'Letecká': google,
}

// seskupení
const tradicni = L.markerClusterGroup();
const multi = L.markerClusterGroup();
const mystery = L.markerClusterGroup();
const letterbox = L.markerClusterGroup();
const wherigo = L.markerClusterGroup();
const virtual = L.markerClusterGroup();
const webcam = L.markerClusterGroup();
const earth = L.markerClusterGroup();
    
const overlays = {
    "<img src='img/tradicka.png' height=20> Tradiční": tradicni,
    "<img src='img/multi.png' height=20> Multi": multi,
    "<img src='img/mystery.png' height=20> Mystery": mystery,
    "<img src='img/letterbox.png' height=20> Letterbox": letterbox,
    "<img src='img/wherigo.png' height=20> Wherigo": wherigo,
    "<img src='img/virtual.png' height=20> Virtual": virtual,
    "<img src='img/webcam.png' height=20> WebCam": webcam,
    "<img src='img/earth.png' height=20> Earth": earth,
}
    
    L.control.layers(baseLayers, overlays).addTo(mymap);
    var lcontrol = L.control.locate().addTo(mymap);  /* ikona polohy */

// stažená data z databáze jsou roztříděna podle typu
// vytvoří markery v mapě   
function renderDataByType(data) {
    const types = {
        traditional: tradicni,
        multi: multi,
        mystery: mystery,
        wherigo: wherigo,
        letterbox: letterbox,
        earth: earth,
        virtual: virtual
    };

    const typeIcon_list = [tradickaIcon, multiIcon, mysteryIcon, wherigoIcon, letterboxIcon, earthIcon, virtualIcon]
    const groupTypes = [tradicni, multi, mystery, wherigo, letterbox,  earth, virtual];
    var i = 0
    for (const type in types) {
        const typeData = data.filter(item => item.typ == type);
        addMarkersToList(typeData, typeIcon_list[i], groupTypes[i])
        i++;
    }
}
// definice funkce pro založení markerů
function addMarkersToList(data, icon, group) {
    for (var i = 0; i < data.length; i++) {
        var {nazev, GC, lat, lon, typ} = data[i]
        L.marker([lat, lon], { icon: icon }).addTo(group)
            .bindPopup(`${nazev}<br>${GC}<br>${lat}, ${lon}`)
            .on("click", onClick);
    }
}

// po kliku vypíše detaily vpravo  
function onClick(e) {
    var popup = e.target.getPopup();
    var obsah_bubliny = popup.getContent();
    var rozdelObsahBubliny = obsah_bubliny.split("<br>");

    var www = "https://coord.info/"  + rozdelObsahBubliny[1];
    
    var souradniceZBubliny = rozdelObsahBubliny[2].split(",");


/*******************************************/
/*     PŘEVOD DECIMAL NA dd° mm.mmm        */
/*******************************************/

    var Ndd = parseInt(souradniceZBubliny[0]);
    var Edd = parseInt(souradniceZBubliny[1]);

    var Nzbytek = parseFloat(souradniceZBubliny[0]) - (Ndd * 1.0);
    var Ezbytek = parseFloat(souradniceZBubliny[1]) - (Edd * 1.0);

    var Nmm = Nzbytek * 60.0;
    var Emm = Ezbytek * 60.0;

    Nmm = Math.round (Nmm * 1000.0) / 1000.0;
    var Nmm3desmista = Nmm.toFixed(3);
    Emm = Math.round (Emm * 1000.0) / 1000.0;
    var Emm3desmista = Emm.toFixed(3);

    var Nsouradky = "N " + Ndd + "° " + Nmm3desmista;
    var Esouradky = "E " + Edd + "° " + Emm3desmista;

    const icon = '<i class="fa fa-angle-double-right"></i>'

    document.getElementById("nazev_kese_zde").innerHTML = rozdelObsahBubliny[0];
    document.getElementById("souradnice_zde").innerHTML = rozdelObsahBubliny[2];
    document.getElementById("gc_kod_zde").innerHTML = rozdelObsahBubliny[1] + " " + icon;
    document.getElementById("gc_kod_zde").setAttribute("href",www);
    document.getElementById("gc_kod_zde").style.marginLeft = "20px";

    document.getElementById("souradniceDDMMmm").innerHTML = Nsouradky + ", " + Esouradky;
};
