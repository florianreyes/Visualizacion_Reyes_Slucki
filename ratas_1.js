d3.dsv(";", "desratizacion.csv", d3.autoType).then((data) => {
  console.log(data);
  let mapa = d3.json("geo-json-bsas.json").then((cityMap) => {
    console.log(cityMap);
    // load the GeoJSON data
    let chart = Plot.plot({
      marks: [
        Plot.geo(cityMap, {
          // add the GeoJSON map
          projection: d3.geoMercator(),
          color: "gray",
          fillColor: "lightblue",
          strokeColor: "white",
        }),
      ],
    });

    // Agregamos chart al div#chart de index.html
    d3.select("#chart").append(() => chart);
  });
});
