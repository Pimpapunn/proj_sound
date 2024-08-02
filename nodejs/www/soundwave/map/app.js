

const map = L.map('map').setView([18.800938160747965, 98.95212346404927], 18);


var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// const url = "https://jumbomap.cmu.ac.th/controls/getApTableGuest.php"
// axios.get(url).then((i) => {


i.data.forEach(e => {
    console.log(e)
    L.circleMarker([e.lat, e.lng], {
        radius: 5, color: "red"
    }).addTo(map).bindPopup(`apName=${e.apName}
            <br>status=${e.status}
            <br>totalUser=${e.totalUser}`);
});
})

const basemap = {
    osm: osm.addTo(map),
    Esri_WorldImagery: Esri_WorldImagery
}
const overlay = {}
L.control.layers(basemap, overlay).addTo(map)