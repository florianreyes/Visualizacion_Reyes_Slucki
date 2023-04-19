d3.dsv(";", "./datasets/147_merge_denuncias.csv", d3.autoType).then((data) => {
  let chart = Plot.plot({
    marks: [
      Plot.barX(data, {
        y: "BARRIO",
        x: "PUNTAJE",
        // fill: (d) => (d.PUNTAJE > 0.8 ? "rgb(177, 0, 38)" : "black"),
        fill: "PUNTAJE",
        sort: { y: "x", reverse: true },
        title: (d) => `${d["BARRIO"]}: ${d["PUNTAJE"] * 100}`,
      }),
    ],
    height: 400,
    width: 800,
    marginLeft: 140,
    marginBottom: 50,
    marginTop: 30,
    marginRight: 10,
    color: {
      scheme: "ylorrd",
    },
    style: {
      "background-color": "#e8e8e8",
      "font-size": "14px",
      "font-family": "Supreme",
      color: "black",
    },
    y: { label: "Barrios ->" },
    x: { label: "Llamados cada 100 personas ->", line: true },
  });
  // Agregamos chart al div#chart de index.html
  d3.select("#chart-1").append(() => chart);
});
