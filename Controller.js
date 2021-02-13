
class Controller{

    constructor(){

        this.classes = {

            categories : [],
            set setCategories(categoryName){
                this.categories.push(categoryName);
            },

            get getCategory(){
                return this.categories
            },

        },
        

        this.algorithm = {

            kMax : undefined ,
            set setKMax (int){
                this.kMax = int;
            },
            get getKMax(){
                return this.kMax
            },


            success:[],
            set resetSuccess(emptyArray){
                this.success = emptyArray;
            },
            set pushFolds(array){
                this.success.push(array)
            },
            get getSuccess(){
                return this.success
            },

            percentages :[],
            set resetPercentages(emptyArray){
                this.percentages = emptyArray;
            },
            set pushPercentages(int){
                this.percentages.push(int)
            },
            get getPercentages(){
                return this.percentages
            },
        };

        this.dataSet = {
            dataArray : [],
            get getDataSet(){
                return this.dataArray
            }
        };

        this.dataTest = {
            dataArray : [],
            get getDataArray(){
                return this.dataArray
            }
        };

        this.html ={
            set createChartCanvas(text){
                this.canvas = document.getElementById('interface').innerHTML = text          
            },
            set modifyBaseText (text){
                this.baseText = document.getElementById('baseText').innerHTML = text
            }
        }

    };
    /*getDataSet(csv file) --> none
    Récupération des données*/
    getDataSet(file){
        if (this.dataSet.dataArray.length != 0){
            this.dataSet.dataArray = [];
        };
        this.data = new GetDataSet(file.files);
            document.getElementById("labelSet").innerHTML = "dataset chargé !";
    };




    /*arrayShuffle(array dataArray) --> none
    Mélange les données de l'array ( algorithme mélange de Fisher-Yates )*/
    arrayShuffle(dataArray){
            for( let i = dataArray.length - 1; i > 0; i--){
                let j = Math.floor(Math.random()*(i+1));
                let actualIndex = dataArray[i];
                dataArray[i] = dataArray[j];
                dataArray[j] = actualIndex;
            }
        //console.log(dataArray)
        
    }

    /*getClasses(arr dataArray) --> none
    trouve les différentes classes du dataset automatiquement et les mets dans un attribut d'instance sous forme d'array*/
    getClasses(dataArray, classes){
        
        
        for (let i = 0; i < dataArray.length; i++){
            let cluster = dataArray[i][dataArray[i].length-1];
            let flag = true;

            for ( let j = 0; j < classes.length; j++){
                if ( cluster.trim() == classes[j].trim()){
                    flag = false;
                    break;
                };
            };

            if ( flag == false ){
                continue;
            };

            this.classes.setCategories = cluster;

        };

    };
    /*findKMax(array dataset) --> none
    Détermine la valeur maximale de k auquel le programme aurait du sens. Temporairement la racine carrée du total de données dans le dataset*/
    findKMax(dataset){
        return Math.floor(Math.sqrt(dataset.length));
    };

    /*arrToClass(array arr) --> str
    retourne la classe la plus représentée, si plusieurs sont égaux ou n'ont aucune --> "undefined" */
    arrayToClass(arr, className){
        
        let compare= [];
        for(let p = 0; p<className.length;p++){
            compare.push(0);
        };
        
        for ( let i = 0; i < arr[0].length; i++){
        
            
            for (let j= 0 ; j < className.length ; j ++){

                
                
                if( arr[0][i][arr[0][0].length-1].trim() == className[j].trim()){
                   
                    compare[j] +=1  ;
                    
                };
            };        
        };
        
        
        let highestNumber = Math.max.apply(null, compare); //Va chercher le plus grand nombre parmi compare (ex: [0,2,3] --> 3)

        function numberOfOccurence(array, value) {
            var count = 0;
            array.forEach((v) => (v === value && count++));
            return count ; //vérifie si le plus grand nombre apparaît plusieurs fois (ex: [0,4,4] --> 2, [0,2,5] --> 1)
        };
        

        if(1 == numberOfOccurence(compare, highestNumber))

        {

            return className[compare.indexOf(highestNumber)];
        }

        else  {
            
            return "undefined" ;
        };
    };
    
    /*getDistanceMax() --> int
    Permets de trouver la distance maximum entre deux données.
    */
    getDistanceMax(){
        let numberOfInformation = this.dataSet.getDataSet[0].length - 1 //[0,1,2,cluster] --> 3 informations
        let shortestArray = [];
        let highestArray = [];
        let distanceMax = []

        
        for (let i = 0; i < numberOfInformation ; i++){ //[0,1,2] index des info
            shortestArray[i] = Number(this.dataSet.getDataSet[0][i])
            highestArray[i] = Number(this.dataSet.getDataSet[0][i])
            for (let j = 1; j < this.dataSet.getDataSet.length; j++){ //dataSet [1,2,3,cluster]

                if ( Number(this.dataSet.getDataSet[j][i]) < shortestArray[i]){
                    shortestArray[i] = Number(this.dataSet.getDataSet[j][i])
                   
                }
                else if ( Number(this.dataSet.getDataSet[j][i]) > highestArray[i]){
                    highestArray[i] = Number(this.dataSet.getDataSet[j][i])
                 
                }

            }
            
        }
        console.log(shortestArray, highestArray)
        let result = 0;
        for ( let i = 0; i < numberOfInformation; i++){
            distanceMax.push(highestArray[i]-shortestArray[i])
        }
        console.log(distanceMax)
        return distanceMax
        
    }
    
    /* getKnn(array dataArray, array point, int kMax) --> array
    revoie les k donnés les plus proches d'une autre donnée sous forme d'array
    */
    getKnn(dataArray, point, kMax, distMax){
       
        let knn = new KNN({dataArray_KNN : dataArray, dataPoint : point , k: kMax, distanceMax : distMax });
        knn.getNN();
        
        return knn.params.nN;
    };
    /*getSuccess() --> None
    Permets de stocker dans un objet global le nombre de bonnes prédictions par l'algorithme par valeur de k*/
    getSuccess(fold, success, dataTest, dataSet, kMax, distMax){
        
        for ( let i = 0; i < dataTest.length; i++){  
            let nearest =  this.getKnn(dataSet, dataTest[i], kMax, distMax );
            for(let k = 0; k < kMax ; k++){

             let arr1=[];
             let arr2=[];
             
             
             
            
             arr1.push(nearest.slice(0,k+1)); // [nearest1], [nearest1, nearest2], ...
             //console.log(arr1)
             arr2.push(this.arrayToClass(arr1, this.classes.getCategory));// [cluster]
            
            
             if ( arr2[0].trim() ==  dataTest[i][dataTest[0].length-1].trim() ){
                
                 success[fold][k] += 1;
                 
             };
            };
        };   
                        
    };

    /*getPercent() --> None
    Mets en pourcentage le nombre de réussites par paramètre k et le stock dans un autre objet global*/
    getPercent(numberOfFolds, numberDataPerFold, success, kMax){
        console.log(this.algorithm.getSuccess)
        
        for(let j = 0; j < kMax; j++){
            let subtotal = 0
            
            for(let i = 0; i < numberOfFolds; i++){
                subtotal += success[i][j];
                
            }
            console.log(subtotal)
            this.algorithm.pushPercentages = (subtotal/(numberOfFolds*numberDataPerFold)*100/10); // le /10--> nombre de répétition crossvalidation
        };
        console.log(this.algorithm.percentages)
        
    };

    /*chartAndTextUpdate()--> none
    Permets d'afficher le graphe dans la page html et de mettre à jour le texte*/
    chartAndTextUpdate(){
        //text update
        this.html.modifyBaseText = "Le graphe ci-dessous contient sur l'axe des abscisses le paramètre k et sur l'axe des ordonnées le pourcentage de réussite du programme. Plus le programme a réussi à deviner la bonne catégorie avec les k voisins les plus proches, plus le pourcentage est grand. Appuyez plusieurs fois sur le bouton 'Calcul' pour être sûr que la valeure de k proposée soit constamment le meilleur à choisir";  
        this.html.createChartCanvas = '<canvas id="myChart"></canvas>';
         
        //chart update
        
        
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

        let percent = [];
        
        for (let i = 0; i < this.algorithm.getPercentages.length; i++){
            percent.push(this.algorithm.getPercentages[i]);
        }
        
        chart.data.datasets[0].data = percent
        for ( let k = 1; k <= this.algorithm.getKMax; k++){
            chart.data.labels.push(k);
            
        };
        
        chart.update()
    };
    /*reset() --> none
    remet à zéro les résultats finaux du programme*/
    reset(){
        this.algorithm.resetSuccess = [];
        this.algorithm.resetPercentages = [];
        
    };

        /*getDataTest(array dataArray, array dataTestArray) --> none
    Permets de prendre une partie du dataSet mélangé et en faire un set d'entraînement (dataTestArray).*/
    
    getDataTest(dataArray, dataTestArray, numberOfData, index ){
        
        let arrayTest = dataArray.slice(index,numberOfData+index);
        
        for ( let i = 0; i < numberOfData; i++){
            dataTestArray.push(arrayTest[i]);
        };
        
        dataArray.splice(index,numberOfData);
    };

    /*resetDataSet(array dataSet, array dataTest, number index) --> none
    Remets le dataSet comme il était avant d'être séparé*/
    resetData(dataSet, dataTest, index){
        for ( let i = dataTest.length-1; i >= 0; i--){
            dataSet.splice(index,0,dataTest[i]);
            
        }
        dataTest.splice(0,);
    }

    /*numberFolds() --> int
    Donne le nombre de folds dont on aura besoin pour le dataset.*/
    numberFolds(dataSet){
        let numberOfFolds = 10;
        if ( dataSet.length % 10 != 0 ){
            numberOfFolds = 11;
        };
        return numberOfFolds
    }

    /*crossvalidation(array dataSet, array dataTest, number numberDataPerFold) --> none
    estimation de la fiabilité du programme*/
    crossvalidation(dataSet, dataTest, numberDataPerFold, numberOfFolds, kMax, distMax){
        //this.arrayShuffle(dataSet);
        console.log(dataSet[0])
        let index = 0;
        
        for(let i = 0; i < numberOfFolds; i++){
            if( i == 10 ){
                this.getDataTest(dataSet, dataTest, dataSet.length%10, index);
                
            } else {
                this.getDataTest(dataSet, dataTest, numberDataPerFold, index);
            };
            this.getSuccess(i, this.algorithm.getSuccess, dataTest, dataSet, kMax, distMax);
            
            this.resetData(dataSet, dataTest, index);
            index+=numberDataPerFold;
        };
        
       
        
    }
    
    repeatedCrossValidation(dataSet, dataTest, numberDataPerFold, numberOfFolds, kMax){
        let distMax = this.getDistanceMax()
        for ( let i = 0; i < 10; i++){
        this.crossvalidation(dataSet, dataTest, numberDataPerFold, numberOfFolds, kMax, distMax);
        }
        this.getPercent(numberOfFolds, numberDataPerFold, this.algorithm.getSuccess, kMax);
    }
    /*showBestKValue()
    Affiche à l'utilisateur les meilleurs paramètre k à prendre
    non-optimisé /!\
    */

    showBestKValue(){
        
        let percent = this.algorithm.getPercentages
        
        function getBestK (){  
            return percent.indexOf(Math.max.apply(null, percent ))+1
        }
        document.getElementById('bestK').innerHTML = "Le meilleur k à choisir dans ce cas est " + String(getBestK())
        
    }

    createFolds(success, numberOfFolds){
        for(let i = 0; i < numberOfFolds; i++){

            this.algorithm.pushFolds = [];
            for(let k = 0; k < this.algorithm.getKMax ; k++){

                success[i].push(0);

            };                  
        };
    }
    /*start() --> None
    corps principal du programme*/ 
    start(){
        this.dataSet.dataArray = this.data.data
        let dataSet = this.dataSet.getDataSet
        let numberOfFolds = this.numberFolds(dataSet)
        let numberDataPerFold = Math.floor(dataSet.length / 10)     
        this.reset();
        
        this.algorithm.setKMax = this.findKMax(dataSet, numberOfFolds, this.algorithm.getSuccess);
        this.createFolds(this.algorithm.getSuccess, numberOfFolds)
        if ( dataSet.length == 0 ){
            document.getElementById("baseText").innerHTML = "Vous avez oublié de charger le dataSet.";
        }
        else {
            this.getClasses(dataSet, this.classes.getCategory);
            
            this.repeatedCrossValidation(dataSet, this.dataTest.getDataArray, numberDataPerFold, numberOfFolds, this.algorithm.getKMax);
            
            this.chartAndTextUpdate();  
            this.showBestKValue()
        }; 
     };

};