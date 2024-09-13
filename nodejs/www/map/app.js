const map = L.map('map').setView([18.800938160747965, 98.95212346404927], 18);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var rasterSound = L.featureGroup()
var featureSound = L.featureGroup()

const basemap = {
    Esri_WorldImagery: Esri_WorldImagery.addTo(map),
    osm: osm
}
const overlay = {
    "แผนที่เสียง": rasterSound.addTo(map),
}
// L.control.layers(basemap, overlay).addTo(map)

fetch('/geojson/buildingcmu')
    .then(response => response.json())
    .then(data => {
        var studyArea = L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: 'blue',
                    weight: 2,
                    fillOpacity: 0.2
                };
            }
        });
        overlay['ขอบเขตพื้นที่ศึกษา'] = studyArea;
        studyArea.addTo(map);
        // L.control.layers(basemap, overlay).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

fetch('/geojson/point')
    .then(response => response.json())
    .then(data => {
        var pointLayer = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: 'red', // สีจุด
                    color: 'black', // สีเส้นขอบ
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
            }
        });

        overlay['จุดวางอุปกรณ์ IOT'] = pointLayer;
        pointLayer.addTo(map);

        // อัปเดตการควบคุมเลเยอร์หลังจากเพิ่มเลเยอร์ใหม่
        L.control.layers(basemap, overlay).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));


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

    // ฟังก์ชันในการดึงสีตามสเกลที่เลือก
    function getColor(scale, index, totalClasses) {
        // กำหนดสีสำหรับแต่ละสเกล
        var colors = {
            viridis: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'],
            inferno: ['#000004', '#420a68', '#932567', '#dd513a', '#fdae61'],
            turbo: ['#30123b', '#c22b74', '#ebeb2c', '#59de4f', '#3f4dd4'],
            rainbow: ['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F', '#00FFFF', '#007FFF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F'],
            jet: ['#00007F', '#0000FF', '#007FFF', '#00FFFF', '#7FFF7F', '#FFFF00', '#FF7F00', '#FF0000'],
            hsv: ['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F', '#00FFFF', '#007FFF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F'],
            hot: ['#000000', '#440154', '#5B2A8D', '#6D6E6E', '#DD3D0C', '#FFDF0F'],
            cool: ['#00FFFF', '#FF00FF'],
            spring: ['#FF00FF', '#FFFF00'],
            summer: ['#00FF00', '#FFFF00'],
            winter: ['#0000FF', '#00FFFF'],
            autumn: ['#FF0000', '#FFFF00'],
            bone: ['#F5F5F5', '#4F4F4F'],
            copper: ['#DA8A2F', '#4E4B4F'],
            greys: ['#FFFFFF', '#000000'],
            yignbu: ['#FFFFCC', '#004529'],
            greens: ['#F7F7F7', '#00441B'],
            yiorrd: ['#FFFFE5', '#67001F'],
            bluered: ['#4575B4', '#D73027'],
            rdbu: ['#313695', '#A50026'],
            picnic: ['#E5F5E0', '#31A354'],
            portland: ['#C6DBEF', '#081D58'],
            blackbody: ['#000000', '#FF0000'],
            earth: ['#1F77B4', '#FF7F0E'],
            electric: ['#FF0000', '#00FF00'],
            magma: ['#000004', '#F7F7F7'],
            plasma: ['#0D0887', '#F0F921']
            // เพิ่มสเกลสีอื่นๆ ที่นี่
        };
        // คืนค่าสีที่ตรงกับสเกลและ index
        return colors[scale] ? colors[scale][index % colors[scale].length] : '#000'; // ดีฟอลต์เป็นสีดำถ้าไม่พบ
    }

    setTimeout(() => {
        // ตรวจสอบว่า windSpeedLayer ถูกกำหนดและใช้งานได้
        if (typeof windSpeedLayer !== 'undefined' && windSpeedLayer.options.renderer) {
            // ดึงค่าขั้นต่ำและค่าสูงสุดจาก windSpeedLayer
            const min = windSpeedLayer.options.renderer.parent.min;
            const max = windSpeedLayer.options.renderer.parent.max;

            // ตรวจสอบค่าของ min และ max
            if (isNaN(min) || isNaN(max)) {
                console.error("Invalid min or max values");
                return;
            }

            // อัปเดตขอบเขตการแสดงของ renderer
            windSpeedLayer.options.renderer.setDisplayRange(min, windSpeedLayer.options.renderer.options.displayMax);
            windSpeedLayer.options.renderer.setDisplayRange(windSpeedLayer.options.renderer.options.displayMin, max);

            // อัปเดต input fields ด้วยค่าปัจจุบัน
            document.getElementById("displayMin").value = min;
            document.getElementById("displayMax").value = max;

            // กำหนดจำนวนชั้นและคำนวณช่วงของ legend
            var cls = 5; // จำนวนชั้นของ legend
            var interval = (max - min) / cls; // คำนวณช่วงโดยใช้ค่าขั้นต่ำและค่าสูงสุด
            var divlegend = ''; // เริ่มต้น divlegend เป็นสตริงว่าง

            // ดึงสีจาก dropdown ที่เลือก
            var colorScale = document.getElementById('colorScale').value;

            // วนลูปเพื่อสร้างเนื้อหา legend
            for (var i = 0; i < cls; i++) {
                var rangeMin = (min + (interval * i)).toFixed(2); // ปรับรูปแบบเป็นทศนิยม 2 ตำแหน่ง
                var rangeMax = (min + (interval * (i + 1))).toFixed(2); // ปรับรูปแบบเป็นทศนิยม 2 ตำแหน่ง
                var color = getColor(colorScale, i, cls);

                divlegend += `<div>
                            <span style="background-color: ${color}; display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></span>
                            ${rangeMin}-${rangeMax} dB(A)
                          </div>`;
            }

            // เพิ่มเนื้อหา legend ที่สร้างขึ้นไปยัง legend container
            document.getElementById('legend-content').innerHTML = divlegend;

            // แสดงข้อมูล legend ใน console สำหรับการ debug
            console.log(divlegend);
        } else {
            console.error("windSpeedLayer is not defined or its renderer is not properly initialized.");
        }
    }, 2000);

    // ฟังก์ชันสำหรับจัดการสีของ legend ตาม dropdown ที่เลือก
    document.addEventListener('DOMContentLoaded', function () {
        var colorScaleElement = document.getElementById('colorScale');
        var legendContent = document.getElementById('legend-content');

        // ฟังก์ชันในการอัปเดต legend ตามสเกลสีที่เลือก
        function updateLegend(selectedScale) {
            var cls = 5; // จำนวนชั้นของ legend
            var min = 0;
            var max = 10;
            var interval = (max - min) / cls; // คำนวณช่วง
            var divlegend = ''; // เริ่มต้น divlegend เป็นสตริงว่าง

            // วนลูปเพื่อสร้างเนื้อหา legend
            for (var i = 0; i < cls; i++) {
                var rangeMin = (min + (interval * i)).toFixed(2);
                var rangeMax = (min + (interval * (i + 1))).toFixed(2);
                divlegend += `<div>
                            <span style="background-color: ${getColor(selectedScale, i, cls)}; display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></span>
                            ${rangeMin}-${rangeMax} dB(A)
                          </div>`;
            }

            // อัปเดตเนื้อหา legend
            legendContent.innerHTML = divlegend;
        }

        // เพิ่ม listener สำหรับการเปลี่ยนค่าใน dropdown
        colorScaleElement.addEventListener('change', function () {
            updateLegend(this.value); // อัปเดต legend ด้วยสเกลที่เลือก
        });

        // เริ่มต้น legend ด้วยสเกลสีดีฟอลต์
        updateLegend(colorScaleElement.value);
    });


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

