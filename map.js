const mapaFetch = d3.json("geo-json-bsas.json");
const dataFetch = d3.dsv(";", "./datasets/147_enero.csv", d3.autoType);

Promise.all([mapaFetch, dataFetch]).then(([mapaFetch, dataFetch]) => {
  const reclamosPorBarrio = d3.group(dataFetch, (d) => d.domicilio_barrio);
  console.log(reclamosPorBarrio);
  // load the GeoJSON data
  let chart = Plot.plot({
    projection: {
      type: "mercator",
      domain: mapaFetch,
    },
    color: {
      type: "quantile",
      n: 10,
      scheme: "ylorbr",
    },
    marks: [
      Plot.geo(mapaFetch, {
        fill: (d) => {
          let nombreBarrio = d.properties.BARRIO;
          let cantReclamos = nombreBarrio
            ? reclamosPorBarrio.get(nombreBarrio).length
            : 0;
          return cantReclamos;
        },
        stroke: "black",
      }),
    ],
  });

  // Agregamos chart al div#chart de index.html
  d3.select("#chart-2").append(() => chart);
});
