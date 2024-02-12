//klucz api leaflet
const apiKey = "";

//inicjalizacji mapy
var map = L.map('map').setView([51.2501, 22.5667], 13);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

//inicjalizacja geolokacji
map.locate({setView: true, maxZoom: 16});

//znaleziono lokalizację
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Jesteś " + radius + " meterów od tego punktu").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

//błąd lokalizacji nie znaleziono
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

//ikona pollub
var pollub_logo = L.icon({
    iconUrl: 'assets/logo_pollub.png',

    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [38, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [-19, -30] // point from which the popup should open relative to the iconAnchor
});

//anotacja politechniki
var grupa = L.layerGroup();

var politechnika = L.marker([51.235343, 22.549222], {icon: pollub_logo}).bindPopup("<b>Politechnika Lubelska</b><br>Pozdrowienia z Politechniki!<br>").addTo(grupa);


//warstwy
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${apiKey}`;

var streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
var satellite = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

var baseLayers = {
    'OpenStreetMap': osm,
    'Ulica': streets,
    'Satelita': satellite
};

var overlayMaps = {
    "Politechnika": grupa
};


//współrzędne przy kliknięciu
var popup = L.popup()

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Współrzędne kliknięcia: " + e.latlng.toString())
        .openOn(map)
}

map.on('click', onMapClick);

var layerControl = L.control.layers(baseLayers, overlayMaps).addTo(map);









