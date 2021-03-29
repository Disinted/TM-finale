class ChartController {
  constructor(parameters) {
    this.params = {};
    for (let k in parameters) {
      this.params[k] = parameters[k];
    }
    this.chartAndTextUpdate();
  }

  /*chartAndTextUpdate()--> none
    Permets d'afficher le graphe dans la page html et de mettre a jour le texte*/
  chartAndTextUpdate() {
    this.params.textController.canvas = '<canvas id="myChart"></canvas>'; //création canvas pour le graphe
    Chart.defaults.scale.ticks.beginAtZero = true;
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      // Le type de graphique qu'on veut creer
      type: "bar",

      // Les informations necessaires pour le graphe
      data: {
        labels: [], //Abscisse
        datasets: [
          {
            label: "Pourcentages de réussite avec les k données plus porche",
            backgroundColor: "rgb(0, 99, 132)",
            data: [], //ordonee
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

  /* affinityPercentagePerOSChart(array percentagePerOS)
  creer un graphe qui affiche dans l'ordre croissant la proximite des reponses de l'utilisateur par rapport aux moyennes des reponses par OS par question.*/
  affinityPercentagePerOSChart(percentagePerOS) {
    this.params.textController.showMeanChartAndText = false;
    let percentageAffinityPerOS = [];
    let arrayCategories = [];
    let forChartObject = { name: "Pourcentage d'affinité par OS" };
    percentagePerOS.forEach((object) => {
      arrayCategories.push(object.name);
      //Pour un meilleur affichage du graphe, les noms d'OS trop long sont raccourcis ici
      if (
        object.name.trim() == "Physique+ application des mathématiques".trim()
      ) {
        arrayCategories.pop();
        arrayCategories.push("PAM");
      } else if (object.name.trim() == "Biologie + chimie".trim()) {
        arrayCategories.pop();
        arrayCategories.push("BIC");
      } else if (object.name.trim() == "Economie + droit ".trim()) {
        arrayCategories.pop();
        arrayCategories.push("Eco + Droit");
      }
      percentageAffinityPerOS.push(object.percentage * 100);
    });

    //formattage plus grand au plus petit pourcentage
    let descendingPercentageOrder = [];
    let descendingCategoriesOrder = [];
    for (let i = 0; i < percentagePerOS.length; i++) {
      let highestPercent = Math.max.apply(null, percentageAffinityPerOS);
      let index = percentageAffinityPerOS.indexOf(highestPercent);
      descendingPercentageOrder.push(highestPercent);
      descendingCategoriesOrder.push(arrayCategories[index]);
      percentageAffinityPerOS.splice(index, 1);
      arrayCategories.splice(index, 1);
    }
    forChartObject.data = descendingPercentageOrder;
    document.getElementById("chartText").innerHTML +=
      " Dans ce cas, le programme vous recommande de prendre l'OS " +
      descendingCategoriesOrder[0] +
      ". Vous pouvez voir sur le graphe votre pourcentage d'affinité par rapport à chaque OS. Vous pouvez aussi voir ci-dessous la recommandation de l'algorithme k-nn pour votre choix d'OS.";
    let options = {
      //pour le graphe
      series: [forChartObject],
      chart: {
        height: "auto",
        type: "bar",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(2) + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: descendingCategoriesOrder,
        position: "top",
        labels: {
          rotate: 0,
        },
        axisBorder: {
          show: false,
          offsetY: -20,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        axisBorder: {
          show: false,
          offsetY: 100,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val.toFixed(2) + "%";
          },
        },
      },
    };
    this.meanAffinityChart = new ApexCharts(
      document.querySelector("#meanChart"),
      options
    );
    this.meanAffinityChart.render();
  }
}
