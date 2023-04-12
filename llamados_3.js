d3.dsv(";", "./datasets/147_merge_denuncias.csv", d3.autoType).then((data) => {
  //   let dataNew = d3.filter(
  //     data,
  //     (d) =>
  //       (d["domicilio_barrio"] == "Palermo" ||
  //         d["domicilio_barrio"] == "Recoleta" ||
  //         d["domicilio_barrio"] == "Belgrano" ||
  //         d["domicilio_barrio"] == "Caballito" ||
  //         d["domicilio_barrio"] == "Flores" ||
  //         d["domicilio_barrio"] == "Almagro" ||
  //         d["domicilio_barrio"] == "Nuñez" ||
  //         d["domicilio_barrio"] == "Barracas") &&
  //       // d["domicilio_barrio"] == "Puerto Madero")
  //       (d["categoria"] == "TRÁNSITO" ||
  //         d["categoria"] == "LIMPIEZA Y RECOLECCIÓN")
  //   );
  //   console.log(dataNew);

  let chart = Plot.plot({
    marks: [
      Plot.barX(data, {
        y: "BARRIO",
        x: "PUNTAJE",
        fill: (d) => (d.PUNTAJE > 0.82 ? "#4CAF50" : "black"),
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
    style: {
      "background-color": "#e8e8e8",
      "font-size": "14px",
      "font-family": "Supreme",
      color: "black",
    },
    y: { label: "Barrios ->" },
    x: { label: "Llamados ->", line: true },
  });
  // Agregamos chart al div#chart de index.html
  d3.select("#chart-1").append(() => chart);
});

// d3.dsv(";", "147_merge_denuncias.csv", d3.autoType).then((data) => {
//   let chart = Plot.plot({
//     marks: [
//       Plot.ruleY(data, {
//         x: (d) => d["PUNTAJE"] * 100,
//         y: "BARRIO",
//         stroke: (d) => (d.BARRIO == "NUÑEZ" ? "green" : "black"),
//         sort: { y: "x", reverse: true },
//         nice: true,
//       }),
//       Plot.dot(data, {
//         x: (d) => d["PUNTAJE"] * 100,
//         y: "BARRIO",
//         fill: (d) => (d.BARRIO == "NUÑEZ" ? "green" : "black"),
//         r: 5,
//         nice: true,
//       }),
//     ],
//     height: 400,
//     width: 800,
//     marginLeft: 140,
//     marginBottom: 50,
//     marginTop: 30,
//     marginRight: 10,
//     style: {
//       "background-color": "#e8e8e8",
//       "font-size": "14px",
//       "font-family": "Supreme",
//     },
//     y: { label: "Barrios ->" },
//     x: { label: "Puntaje ->", line: true },
//   });
//   // Agregamos chart al div#chart de index.html
//   d3.select("#chart-1").append(() => chart);
// });
