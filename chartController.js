class ChartController{
    constructor(parameters){
        this.params = {};
        for (let k in parameters) {
            this.params[k] = parameters[k];
        };
        this.chartAndTextUpdate()      
    }

    /*chartAndTextUpdate()--> none
    Permets d'afficher le graphe dans la page html et de mettre à jour le texte*/
    chartAndTextUpdate(){ 
        this.params.textController.canvas = '<canvas id="myChart"></canvas>'; //création canvas pour le graphe  
        Chart.defaults.scale.ticks.beginAtZero = true;
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
        // Le type de graphique qu'on veut créer
        type: 'bar',

        // Les informations nécessaires pour le graphe
        data: {
        labels: [], //Abscisse
        datasets: [{
            label : "Pourcentages de réussite avec les k données plus porche",
            backgroundColor: 'rgb(0, 99, 132)',
            data: [],//ordonée
        }]
        },
        options:{
            scales: {
              yAxes : [{
                scaleLabel:{
                    display : true,
                    labelString : "Pourcentages" //Etiquette
                },
                ticks : {
                  max : 100,    
                }
              }],
              xAxes : [{
                  scaleLabel:{
                      display : true,
                      labelString : "Valeur de k" //Etiquette
                  }
              }]
            }
          }
        });
        
        chart.data.datasets[0].data = this.params.percentages
        for ( let k = 1; k <= this.params.kMax; k++){
            chart.data.labels.push(k);
            
        };
        
        chart.update()
    };
}