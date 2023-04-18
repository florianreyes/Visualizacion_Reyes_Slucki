d3.dsv(";", "./datasets/delitos_denuncias_merge.csv", d3.autoType).then(
  (data) => {
    const data2 = [];
    const pond_data = [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
    ];
    // Iterate over the data object
    for (let i = 0; i <= 10; i++) {
      for (barrio of data) {
        // Iterate over the months
        // Add barrio, month, and count to the data2 array
        data2.push({
          barrio: barrio.BARRIO,
          ponderacion: pond_data[i],
          count: Number(barrio[`pond_${i}`]) * 100,
        });
      }
    }
    console.log(data2);
    let chart = Plot.plot({
      marks: [
        Plot.line(data2, {
          y: "count",
          x: "ponderacion",
          z: "barrio",
          stroke: (d) => {
            if (d.barrio == "PALERMO") return "red";
            else if (d.barrio == "BARRACAS") return "blue";
            else if (d.barrio == "RECOLETA") return "green";
            else return "black";
          },
          title: "barrio",
          strokeWidth: 2,
        }),
      ],
      height: 400,
      width: 800,
      marginLeft: 140,
      marginBottom: 50,
      marginTop: 30,
      marginRight: 10,
      color: {
        legend: true,
      },
      style: {
        "background-color": "#e8e8e8",
        "font-size": "14px",
        "font-family": "Supreme",
        color: "black",
      },
      y: { label: "Barrios ->", line: true },
      x: { label: "Seguridad vs Tránsito(%) ->", line: true },
    });
    // Agregamos chart al div#chart de index.html
    d3.select("#chart-4").append(() => chart);
  }
);
