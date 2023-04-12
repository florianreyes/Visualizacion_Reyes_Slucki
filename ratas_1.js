d3.dsv(";", "147_enero.csv", d3.autoType).then((data) => {
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

// config. fecha español
// d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
//   d3.timeFormatDefaultLocale(locale)
// })

// d3.dsv(";", "147_enero.csv", d3.autoType).then((data) => {
//   console.table(data);
//   // Guardamos el svg generado en la variable chart
//   let chart = Plot.plot({
//     marks: [
//       Plot.dot(data, {
//         x: (d) => d["lon"],
//         y: (d) => d["lat"],
//         title: (d) => d["lon"] + ", " + d["lan"],
//         // fill: 'domicilio_comuna',
//         strokeOpacity: 0.5,
//       }),
//     ],
//     x: {
//       label: "Longitud",
//     },
//     y: {
//       label: "Latitud",
//     },
//   });
//   // Agregamos chart al div#chart de index.html
//   d3.select("#chart").append(() => chart);
// });
