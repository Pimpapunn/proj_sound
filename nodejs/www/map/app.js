const map = L.map('map').setView([18.800938160747965, 98.95212346404927], 18);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var rasterSound = L.featureGroup()
var featureSound = L.featureGroup()

const basemap = {
    osm: osm.addTo(map),
    Esri_WorldImagery: Esri_WorldImagery
}
const overlay = {
    "แผนที่เสียง": rasterSound.addTo(map),
    "ทิศทางเสียง": featureSound.addTo(map)
}
L.control.layers(basemap, overlay).addTo(map)

function toggleHam(x) {
    x.classList.toggle("change");

    let myMenu = document.getElementById('myMenu');
    if (myMenu.className === 'menu') {
        myMenu.className += ' menu-active'
    } else {
        myMenu.className = 'menu';
    }
}

async function showGeotiff(dayName, timeStart, timeEnd) {
    map.eachLayer((layer) => {
        if (layer.options.name == 'sound') {
            // console.log(layer);
            map.removeLayer(layer);
        }
    });

    const soundmap = `/sss/output/idw_${dayName}_${timeStart}${timeEnd}.tif`;
    // console.log(soundmap);

    // const windSpeedUrl = soundmap;
    const plottyRenderer = L.LeafletGeotiff.plotty({
        displayMin: 0,
        displayMax: 10,
        clampLow: false,
        clampHigh: false,
    });

    const windSpeedLayer = L.leafletGeotiff(soundmap, {
        name: "sound",
        renderer: plottyRenderer,
    }).addTo(rasterSound);

    // Wait for getMinMax() to resolve
    setTimeout(() => {
        const min = windSpeedLayer.options.renderer.parent.min;
        const max = windSpeedLayer.options.renderer.parent.max;

        windSpeedLayer.options.renderer.setDisplayRange(
            min,
            windSpeedLayer.options.renderer.options.displayMax
        );

        windSpeedLayer.options.renderer.setDisplayRange(
            windSpeedLayer.options.renderer.options.displayMin,
            max
        );

        document.getElementById("displayMin").value = min
        document.getElementById("displayMax").value = max
    }, 1000)
    console.log("Min value:", min);
    console.log("Max value:", max);


    // VECTOR ARROW EG
    // const windDirUrl = soundmap;
    const arrowRenderer = L.LeafletGeotiff.vectorArrows({
        arrowSize: 20,
    });

    const windDirLayer = L.leafletGeotiff(soundmap, {
        name: "sound",
        renderer: arrowRenderer,
    }).addTo(featureSound);

    $("#displayMin").on("change", (event) => {
        windSpeedLayer.options.renderer.setDisplayRange(
            +event.currentTarget.value,
            windSpeedLayer.options.renderer.options.displayMax
        );
    });

    $("#displayMax").on("change", (event) => {
        windSpeedLayer.options.renderer.setDisplayRange(
            windSpeedLayer.options.renderer.options.displayMin,
            +event.currentTarget.value
        );
    });

    $("#clampLow").on("change", (event) => {
        windSpeedLayer.options.renderer.setClamps(
            event.currentTarget.checked,
            windSpeedLayer.options.renderer.options.clampHigh
        );
    });

    $("#clampHigh").on("change", (event) => {
        windSpeedLayer.options.renderer.setClamps(
            windSpeedLayer.options.renderer.options.clampLow,
            event.currentTarget.checked
        );
    });

    $("#colorScale").on("change", (event) => {
        const colorScale = $("#colorScale option:selected").val();
        windSpeedLayer.options.renderer.setColorScale(colorScale);
    });

    $("#getBounds").on("click", (event) => {
        event.preventDefault();
        const bounds = windSpeedLayer.getBounds();
        map.fitBounds(bounds, { maxZoom: 15 });
    });

    $("#getColorbarOptions").on("click", (event) => {
        event.preventDefault();
        const options = windSpeedLayer.options.renderer.getColorbarOptions();
        console.log("getColorbarOptions", options);
    });

    let popup;
    map.on("click", function (e) {
        if (!popup) {
            popup = L.popup().setLatLng([e.latlng.lat, e.latlng.lng]).openOn(map);
        } else {
            popup.setLatLng([e.latlng.lat, e.latlng.lng]);
        }

        const value = windSpeedLayer.getValueAtLatLng(+e.latlng.lat, +e.latlng.lng);
        popup
            .setContent(`Possible value at point (experimental/buggy): ${value}`)
            .openOn(map);
    });
}


// const server = "http://localhost:5400/bds/interpolation"
const server = "https://geodev.fun/bds/interpolation"

function getData() {
    let dayName = document.getElementById("dayName").value
    let time = document.getElementById("time").value

    let timeArr = time.split("_");
    let timeStart = timeArr[0];
    let timeEnd = timeArr[1];

    console.log(dayName, timeStart, timeEnd);


    fetch(server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dayName: dayName,
            timeStart: timeStart,
            timeEnd: timeEnd
        })
    })
        .then(response => response.json())
        .then(data => {

            showGeotiff(dayName, timeStart, timeEnd)

            console.log("Response from server:", data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


}

