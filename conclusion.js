window.addEventListener("DOMContentLoaded", (event) => {
  // Call changeRender() when the page is loaded
  changeRender();
});
function changeRender() {
  let i = document.getElementById("slider").value;
  d3.dsv(";", "./datasets/delitos_denuncias_merge.csv", d3.autoType).then(
    (data) => {
      const data2 = [];
      for (barrio of data) {
        data2.push({
          barrio: barrio.BARRIO,
          count: Number(barrio[`pond_${i}`]) * 100 - 4,
        });
      }

      let chart = Plot.plot({
        marks: [
          Plot.dot(data2, {
            x: "count",
            y: "barrio",
            r: 10,
            fill: "count",
            sort: { y: "x", reverse: false },
            title: "barrio",
            strokeWidth: 2,
          }),
        ],
        height: 400,
        width: 800,
        marginLeft: 140,
        marginBottom: 30,
        marginTop: 30,
        marginRight: 10,
        color: {
          // legend: true,
          scheme: "ylorrd",
        },
        style: {
          "background-color": "#e8e8e8",
          "font-size": "14px",
          "font-family": "Supreme",
          color: "black",
        },
        y: { label: "Barrios ->", line: true },
        x: {
          label: "Cantidad de denuncias ->",
          line: true,
          zero: true,
          nice: true,
          ticks: false
        },
      });
      document.getElementById("chart-4").innerHTML = "";
      // Agregamos chart al div#chart de index.html
      d3.select("#chart-4").append(() => chart);
    }
  );
}
