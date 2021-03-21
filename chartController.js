class ChartController {
  constructor(parameters) {
    this.params = {};
    for (let k in parameters) {
      this.params[k] = parameters[k];
    }
    this.chartAndTextUpdate();
    this.scatterChart();
  }

  /*chartAndTextUpdate()--> none
    Permets d'afficher le graphe dans la page html et de mettre à jour le texte*/
  chartAndTextUpdate() {
    this.params.textController.canvas = '<canvas id="myChart"></canvas>'; //création canvas pour le graphe
    Chart.defaults.scale.ticks.beginAtZero = true;
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      // Le type de graphique qu'on veut créer
      type: "bar",

      // Les informations nécessaires pour le graphe
      data: {
        labels: [], //Abscisse
        datasets: [
          {
            label: "Pourcentages de réussite avec les k données plus porche",
            backgroundColor: "rgb(0, 99, 132)",
            data: [], //ordonée
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Pourcentages", //Etiquette
              },
              ticks: {
                max: 100,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Valeur de k", //Etiquette
              },
            },
          ],
        },
      },
    });

    chart.data.datasets[0].data = this.params.percentages;
    for (let k = 1; k <= this.params.kMax; k++) {
      chart.data.labels.push(k);
    }

    chart.update();
  }

  /*scatterChart() --> none
    graphe montrant les réponses des personnes par OS pour chaque question sous forme de nuage de points*/
  scatterChart() {
    let dataSet = [...this.params.dataSet];
    let classes = [...this.params.classes];
    let scatterChartInfo = [];
    classes.forEach(function (OS) {
      let OSDatas = [];
      let OSobject = { name: OS }; //besoin que ce soit sous forme d'objet pour le graphe
      dataSet.forEach(function (data) {
        //mettre dans OSDatas les données des personnes appartenant à une certaine OS
        if (data[data.length - 1] == OS) {
          OSDatas.push(data);
        }
      });
      let dataPoints = [];
      OSDatas.forEach(function (data) {
        for (let i = 0; i < data.length - 1; i++) {
          dataPoints.push([i + 1, data[i]]);
        }
      });
      OSobject.data = dataPoints;
      scatterChartInfo.push(OSobject);
    });

    let options = {
      //pour le graphe
      series: scatterChartInfo,
      chart: {
        height: "auto",
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      xaxis: {
        offsetX: 1,
        tickAmount: 30,
      },
      yaxis: {
        offsetY: 0,
        tickAmount: 6,
      },
    };
    console.log(options);
    let chart = new ApexCharts(document.querySelector("#chartBoi"), options);
    chart.render();
  }
}
