d3.dsv(";", "147_enero.csv", d3.autoType).then((data) => {
  let dataNew = d3.filter(
    data,
    (d) =>
      (d["domicilio_barrio"] == "Palermo" ||
        d["domicilio_barrio"] == "Recoleta" ||
        d["domicilio_barrio"] == "Belgrano" ||
        d["domicilio_barrio"] == "Caballito" ||
        d["domicilio_barrio"] == "Flores" ||
        d["domicilio_barrio"] == "Almagro" ||
        d["domicilio_barrio"] == "Nuñez" ||
        d["domicilio_barrio"] == "Barracas" ||
        d["domicilio_barrio"] == "Puerto Madero") &&
      (d["categoria"] == "TRÁNSITO" ||
        d["categoria"] == "LIMPIEZA Y RECOLECCIÓN")
  );

  let chart = Plot.plot({
    facet: { data: dataNew, x: "categoria", label: null },
    marks: [
      Plot.barX(
        dataNew,
        Plot.groupY(
          {
            x: "count",
          },
          {
            y: "domicilio_barrio",
            // sort: { x: "y", reverse: true },
          }
        )
      ),
    ],
    height: 400,
    width: 800,
    marginLeft: 120,
    marginBottom: 50,
    marginTop: 30,
    style: {
      "background-color": "#e8e8e8",
      "font-size": "14px",
      "font-family": "Supreme",
      color: "black",
    },
    y: { label: "Barrios ->", line: true },
    x: { label: "Llamados ->", line: true },
  });
  // Agregamos chart al div#chart de index.html
  d3.select("#chart").append(() => chart);
});
