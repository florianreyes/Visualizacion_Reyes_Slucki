const mapaFetch = d3.json("geo-json-bsas.json");
const dataFetch = d3.dsv(
  ";",
  "./datasets/delitos_2021_cantidad.csv",
  d3.autoType
);

Promise.all([mapaFetch, dataFetch]).then(([mapa, data]) => {
  mapa.features.forEach((feature) => {
    const nombreBarrio = feature.properties.BARRIO;
    // find matching 'BARRIO' in data and add its 'CANTIDAD' property to the feature
    const barrioData = data.find((d) => d.BARRIO === nombreBarrio);
    if (barrioData) {
      feature.properties.CANTIDAD = barrioData.CANTIDAD;
    } else {
      // handle cases where a matching 'BARRIO' is not found in data
      feature.properties.CANTIDAD = 0;
      console.warn(`No matching data for ${nombreBarrio}.`);
    }
  });
  let chartMap = Plot.plot({
    projection: {
      type: "mercator",
      domain: mapa, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: "quantize",
      n: 10,
      scheme: "ylorrd",
      label: "Cantidad de robos y homicidios",
      // legend: true,
    },
    marks: [
      Plot.geo(mapa, {
        fill: (d) => {
          let nombreBarrio = d.properties.BARRIO;
          let cantReclamos = d.properties.CANTIDAD;
          return cantReclamos;
        },
        stroke: "black",
        // title: d => ${d.properties.BARRIO}\n${d.properties.DENUNCIAS}
      }),
      Plot.text(
        mapa.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "currentColor",
          stroke: "white",
          textAnchor: "center",
          dx: 4,
          filter: (d) => d.properties.CANTIDAD > 3600,
        })
      ),
    ],
    height: 600,
    width: 800,
    // marginLeft: 140,
    // marginBottom: 50,
    // marginTop: 30,
    // marginRight: 10,
    style: {
      "background-color": "#e8e8e8",
      "font-size": "14px",
      "font-family": "Supreme",
      color: "black",
    },
  });
  d3.select("#chart-2").append(() => chartMap);
});
