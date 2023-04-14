const mapaFetch_normalized = d3.json("geo-json-bsas.json");
const dataFetch_normalized = d3.dsv(
  ";",
  "./datasets/delitos_2021_cantidad.csv",
  d3.autoType
);

Promise.all([mapaFetch_normalized, dataFetch_normalized]).then(
  ([mapa, data]) => {
    mapa.features.forEach((feature) => {
      const nombreBarrio = feature.properties.BARRIO;
      // find matching 'BARRIO' in data and add its 'CANTIDAD' property to the feature
      const barrioData = data.find((d) => d.BARRIO === nombreBarrio);
      if (barrioData) {
        feature.properties.PUNTAJE = barrioData.PUNTAJE;
      } else {
        // handle cases where a matching 'BARRIO' is not found in data
        feature.properties.PUNTAJE = 0;
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
        label: "Cantidad de robos y homicidios cada 1000 personas.",
        // legend: true,
      },
      marks: [
        Plot.geo(mapa, {
          fill: (d) => {
            let nombreBarrio = d.properties.BARRIO;
            let cantReclamos = d.properties.PUNTAJE;
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
            filter: (d) => d.properties.PUNTAJE > 30,
          })
        ),
      ],
    });
    d3.select("#chart-3").append(() => chartMap);
  }
);
