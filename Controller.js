class controller{

    constructor(){

        this.classes = [];

        this.algorithm = {
            numberDataPerFold : undefined,
            kMax : undefined ,
            success:[],
            percentages :[],
        };

        this.dataSet = {
            dataArray : [],
        };

        this.dataTest = {
            dataArray : [],
        };

    };
    /*getDataSet(csv input, str dataType) --> none
    enregistre dans des objets globaux les données sous forme d'array d'array ( [[data1], [data2]])*/
    getDataSet(input, dataType) {
        //permet de réinitialiser la valeur de l'array si l'utilisateur charge plusieurs fois le fichier
        dataType.dataArray = [];
        //récupération des csv
        if (input.files && input.files[0]) {
    
            let reader = new FileReader();
            reader.readAsBinaryString(input.files[0]);
            reader.onload = function (e) {
                
                let dataFile = e.target.result;  
                let data = dataFile.split("\n");

                for ( let x = 0; x < data.length; x++){

                    dataType.dataArray.push(data[x].split(","));

                };
             };
        };
        //Confirmation du chargement du dataset
        if ( dataType == this.dataSet){
            document.getElementById("labelSet").innerHTML = "dataset chargé !";
        };
    }; 


    /*arrayShuffle(array dataArray) --> array
    Mélange les données de l'array ( algorithme mélange de Fisher-Yates )*/
    arrayShuffle(dataArray){
            for( let i = dataArray.length - 1; i > 0; i--){
                let j = Math.floor(Math.random()*(i+1));
                let actualIndex = dataArray[i];
                dataArray[i] = dataArray[j];
                dataArray[j] = actualIndex;
            }
        console.log(dataArray)
        return dataArray;
    }

    /*getClasses(arr dataArray) --> none
    trouve les différents classe du dataset automatiquement et les mets dans un attribut d'instance sous forme d'array*/
    getClasses(dataArray){
        
        
        for (let i = 0; i < dataArray.length; i++){
            let cluster = dataArray[i][dataArray[i].length-1];
            let flag = true;

            for ( let j = 0; j < this.classes.length; j++){
                if ( cluster.trim() == this.classes[j].trim()){
                    flag = false;
                    break;
                };
            };

            if ( flag == false ){
                continue;
            };

            this.classes.push(cluster);

        };

    };
    /*getKMax(array dataset) --> none
    determine la valeur du k maximum auquel le programme aurait du sens. Temporairement la racine carrée du total de données dans le dataset*/
    getKMax(dataset, numberOfFolds){
        this.algorithm.kMax = Math.floor(Math.sqrt(dataset.length));
        for(let i = 0; i < numberOfFolds; i++){

            this.algorithm.success.push([])
            for(let k = 0; k < this.algorithm.kMax ; k++){

                this.algorithm.success[i].push(0);

            };
        };
    };
    /*arrToClass(array arr) --> str
    retourne la classe la plus représenté, si plusieurs sont égaux ou n'ont aucune --> "undefined" */
    arrayToClass(arr){
        
        let className = this.classes;
        let compare= [];
        for(let p = 0; p<className.length;p++){
            compare.push(0);
        }
        
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
            return count ; //vérifie si le plus grand nombre apparait plusieurs fois (ex: [0,4,4] --> 2, [0,2,5] --> 1)
        };
        

        if(1 == numberOfOccurence(compare, highestNumber))

        {

            return className[compare.indexOf(highestNumber)];
        }

        else  {
            
            return "undefined" ;
        };

    };
    /* getKnn(array dataArray, array point, int kMax) --> array
    revoie les k données les plus proches d'un autre donnée sous forme d'array
    */
    getKnn(dataArray, point, kMax){
       
        let knn = new KNN({dataArray_KNN : dataArray, dataPoint : point , k: kMax });
        knn.getNN();
        return knn.params.nN;
    };
    /*getSuccess() --> None
    Permet de sotcker dans un objet global le nombre de bonne prédiction par l'algorithme par k*/
    getSuccess(fold){

        for ( let i = 0; i < this.dataTest.dataArray.length; i++){  
            let nearest =  this.getKnn(this.dataSet.dataArray, this.dataTest.dataArray[i], this.algorithm.kMax);
            for(let k = 0; k < this.algorithm.kMax ; k++){

             let arr1=[];
             let arr2=[];
             
             
             
            
             arr1.push(nearest.slice(0,k+1)); // [nearest1], [nearest1, nearest2], ...
             console.log(arr1)
             arr2.push(this.arrayToClass(arr1));// [cluster]
            
            
             if ( arr2[0].trim() ==  this.dataTest.dataArray[i][this.dataTest.dataArray[0].length-1].trim() ){
                
                 this.algorithm.success[fold][k] += 1;
                 
             };
            

            };
        
        };
                        
    };
    /*getPercent() --> None
    Met en pourcentage le nombre de réussite par paramètre k et le stock dans un autre objet global*/
    getPercent(numberOfFolds, numberDataPerFold){
        console.log(this.algorithm.success)
        
        for(let j = 0; j < this.algorithm.kMax; j++){
            let subtotal = 0
            
            for(let i = 0; i < numberOfFolds; i++){
                subtotal += this.algorithm.success[i][j]
                console.log(this.algorithm.success[i][j])
            }
            console.log(subtotal)
            this.algorithm.percentages.push(subtotal/(numberOfFolds*numberDataPerFold)*100)
        }
        console.log(this.algorithm.percentages)
    };
    /*chartAndTextUpdate()--> none
    Permet d'afficher le graphe dans la page html et de mettre à jour le texte*/
    chartAndTextUpdate(){
        //text update
        document.getElementById('baseText').innerHTML = "Le graphe ci-dessous contient sur l'axe des abscisses le paramètre k et sur l'axe des ordonnées le pourcentage de réussite du programme.";
    
        document.getElementById('interface').innerHTML += '<canvas id="myChart"></canvas>';
        
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
            label: 'Pourcentage de fiabilité',
            backgroundColor: 'rgb(0, 99, 132)',
            data: [],//ordonée
        }]
        },
        options:{
            scales: {
              yAxes : [{
                ticks : {
                  max : 100,    
                }
              }]
            }
          }
        });


        chart.data.datasets[0].data = program.algorithm.percentages
        for ( let k = 1; k <= this.algorithm.kMax; k++){
            chart.data.labels.push(k);
            
        };
        
        chart.update()
    };
    /*reset() --> none
    remet à zéro les résultats finaux du programme*/
    reset(){
        this.algorithm.success = [];
        this.algorithm.percentages = [];
    };

        /*getDataTest(array dataArray, array dataTestArray) --> none
    Permet de prendre une partie du dataSet mélangé et en faire un set d'entraînement (dataTestArray).*/
    
    getDataTest(dataArray, dataTestArray, numberOfData, index ){
        
        let arrayTest = dataArray.slice(index,numberOfData+index);
        
        for ( let i = 0; i < numberOfData; i++){
            dataTestArray.push(arrayTest[i]);
        };
        
        dataArray.splice(index,numberOfData);
    };

    /*resetDataSet(array dataSet, array dataTest, number index) --> none
    remet le dataSet comme il était avant d'être séparé*/
    resetData(dataSet, dataTest, index){
        for ( let i = dataTest.length-1; i >= 0; i--){
            dataSet.splice(index,0,dataTest[i])
            
        }
        dataTest.splice(0,)
    }

    /*crossvalidation(array dataSet, array dataTest, number numberDataPerFold) --> none
    estimation de la fiabilité du programme*/
    crossvalidation(dataSet, dataTest, numberDataPerFold){
        
        numberDataPerFold = Math.floor(dataSet.length / 10);
        let numberOfFolds = 10;
        if ( dataSet.length % 10 != 0 ){
            numberOfFolds = 11
        };
        this.getKMax(dataSet, numberOfFolds);
        let index = 0
        for(let i = 0; i < numberOfFolds; i++){
            if( i == 10 ){
                this.getDataTest(dataSet, dataTest, dataSet.length%10, index)
                
            } else {
                this.getDataTest(dataSet, dataTest, numberDataPerFold, index);
            };
            this.getSuccess(i);
            this.resetData(dataSet, dataTest, index);
            index+=numberDataPerFold
        };
        this.getPercent(numberOfFolds, numberDataPerFold);
    }
    
    /*start() --> None
    corps princpal du programme*/ 
    start(){
        this.reset();
        if ( this.dataSet.dataArray.length == 0 ){
            document.getElementById("baseText").innerHTML = "Vous avez oublié de charger le dataSet.";
        }
        else {
            this.getClasses(this.dataSet.dataArray);
            this.arrayShuffle(this.dataSet.dataArray);
            this.crossvalidation(this.dataSet.dataArray, this.dataTest.dataArray, this.algorithm.numberDataPerFold);
            this.chartAndTextUpdate();  
        };
            
     };
};
