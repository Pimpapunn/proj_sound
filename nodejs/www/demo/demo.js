$(document).ready(function () {
  // MAP
  const map = L.map("map").setView([18.800938160747965, 98.95212346404927], 5);
  var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const windSpeedUrl = "/output/idw_wednesday_0809.tif";
  const plottyRenderer = L.LeafletGeotiff.plotty({
    displayMin: 0,
    displayMax: 10,
    clampLow: false,
    clampHigh: false,
  });
  const windSpeedLayer = L.leafletGeotiff(windSpeedUrl, {
    renderer: plottyRenderer,
  }).addTo(map);

  // VECTOR ARROW EG
  const windDirUrl = "/output/idw_wednesday_0809.tif";
  const arrowRenderer = L.LeafletGeotiff.vectorArrows({
    arrowSize: 20,
  });
  const windDirLayer = L.leafletGeotiff(windDirUrl, {
    renderer: arrowRenderer,
  }).addTo(map);

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
});
