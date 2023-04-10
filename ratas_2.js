d3.dsv(";", "desratizacion.csv", d3.autoType).then((data) => {
  console.log(data);
  // load the GeoJSON data
  let chart = Plot.plot({
    marks: [
      Plot.barX(
        data,
        Plot.groupY(
          { x: "count" },
          {
            x: "y",
            y: "domicilio_barrio",
            fill: "domicilio_comuna",
            fillOpacity: 0.8,
            sort: { y: "x", reverse: true, limit: 10 },
          }
        )
      ),
    ],
    style: {
      "font-size": "14px",
      "font-family": "Supreme",
      color: "white",
      "background-color": "black",
    },
    color: { scheme: "blues" },
    x: { label: "Frecuencia de llamados", line: true },
    y: { label: "Barrios", line: true },
    marginLeft: 150,
    marginRight: 10,
    marginBottom: 50,
  });
  // Agregamos chart al div#chart de index.html
  d3.select("#chart").append(() => chart);
});