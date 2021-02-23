
class Controller{

    constructor(){

        this.classes = [];
        this.success = [];
        this.percentages = [];
        this.kMax = undefined;

    };



    /*getDataSet(csv file) --> none
    Récupération des données*/
    getDataSet(file){

        this.data = new GetDataSet(file.files);
            document.getElementById("labelSet").innerHTML = "dataset chargé !";
    };



    /*findKMax(array dataset) --> none
    Détermine la valeur maximale de k auquel le programme aurait du sens. Calculé dans le controller pour éviter de calculer plusieurs fois.*/
    findKMax(dataset){
        return Math.floor(Math.sqrt(dataset.length));
    };

    /*arrToClass(array arr, arr className) --> str
    retourne la classe la plus représentée, ou "undefined" */
    arrayToClass(arr, className){
        
        let compare= [];
        for(let p = 0; p<className.length;p++){
            compare.push(0);
        };
        
        for ( let i = 0; i < arr.length; i++){
            
            
            for (let j= 0 ; j < className.length ; j ++){

                
                
                if( arr[i][arr[0].length-1].trim() == className[j].trim()){
                   
                    compare[j] +=1  ;
                    
                };
            };        
        };
        
        
        let highestNumber = Math.max.apply(null, compare); //Va chercher le plus grand nombre parmi compare (ex: [0,2,3] --> 3)
        /*numberOfOccurence(array array, int value) --> int
           vérifie si le plus grand nombre dans array apparaît plusieurs fois (ex: [0,4,4] --> 2 (array = [0,4,4], value = 4), [0,2,5] --> 1)*/
        function numberOfOccurence(array, value) {
            var count = 0;
            array.forEach((v) => (v === value && count++));
            return count ; 
        };
        

        if(1 == numberOfOccurence(compare, highestNumber))

        {

            return className[compare.indexOf(highestNumber)];
        }

        else  {
            
            return "undefined" ;
        };
    };
    
    /*getDistanceMax() --> array
    Permet de trouver la distance maximale entre deux données données. Calculé dans le controller pour éviter de calculer plusieurs fois les distances.
    */
    getDistanceMax(){
        let numberOfInformation = this.data.data[0].length - 1 //[0,1,2,cluster] --> 3 informations
        let shortestArray = [];
        let highestArray = [];
        let distanceMax = []

        
        for (let i = 0; i < numberOfInformation ; i++){ //[0,1,2] index des info
            shortestArray[i] = Number(this.data.data[0][i])
            highestArray[i] = Number(this.data.data[0][i])
            for (let j = 1; j < this.data.data.length; j++){ //dataSet [1,2,3,cluster]

                if ( Number(this.data.data[j][i]) < shortestArray[i]){
                    shortestArray[i] = Number(this.data.data[j][i])
                   
                }
                else if ( Number(this.data.data[j][i]) > highestArray[i]){
                    highestArray[i] = Number(this.data.data[j][i])
                 
                }

            }
            
        }
        
        
        for ( let i = 0; i < numberOfInformation; i++){
            distanceMax.push(highestArray[i]-shortestArray[i])
        }
        console.log(distanceMax)
        return distanceMax
        
    }
    
    /* getKnn(array dataArray, array point, int kMax, arr distMax) --> array
    revoie les k donnés les plus proches d'une autre donnée sous forme d'array ( algorithme K-NN )
    */
    getKnn(dataArray, point, kMax, distMax){
       
        let knn = new KNN({dataArray_KNN : dataArray, dataPoint : point , k: kMax, distanceMax : distMax });
        knn.getNN();
        
        return knn.params.nN;
    };
    
    /*getSuccess(int fold, array success, array dataTest, array dataSet, int kMax, array distMax) --> None
    Permets de stocker dans un objet global le nombre de bonnes prédictions par l'algorithme par valeur de k*/
    getSuccess(fold, success, dataTest, dataSet, kMax, distMax){
        console.log(success)
        for ( let i = 0; i < dataTest.length; i++){  
            let nearest =  this.getKnn(dataSet, dataTest[i], kMax, distMax );
            for(let k = 0; k < kMax ; k++){

             let arr1 = undefined;
             let arr2=[];
             
             
             
            
             arr1 = nearest.slice(0,k+1); // [nearest1], [nearest1, nearest2], ...
             
             arr2.push(this.arrayToClass(arr1, this.classes));// [cluster]
            
            
             if ( arr2[0].trim() ==  dataTest[i][dataTest[0].length-1].trim() ){
                
                 success[fold][k] += 1;
                 
             };
            };
        };   
                        
    };

    /*getPercent(int numberOfFolds, int numberDataPerFold, array success, int kMax) --> None
    Mets en pourcentage le nombre de réussites par paramètre k et le stock dans un autre objet global*/
    getPercent(numberOfFolds, numberDataPerFold, success, kMax){
        
        
        for(let j = 0; j < kMax; j++){
            let subtotal = 0
            
            for(let i = 0; i < numberOfFolds; i++){
                subtotal += success[i][j];
                
            }
            console.log(subtotal)
            this.percentages.push(subtotal/(numberOfFolds*numberDataPerFold)*100/10); // le /10--> nombre de répétition crossvalidation
        };
        console.log(this.percentages)
        
    };

    /*reset() --> none
    remet à zéro les résultats finaux du programme*/
    reset(){
        this.success = [];
        this.percentages = [];
        
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




    /*crossvalidation(array dataSet, array dataTest, number numberDataPerFold) --> none
    estimation de la fiabilité du programme*/
    crossvalidation(dataSet, dataTest, numberDataPerFold, numberOfFolds, kMax, distMax){
        let shuffledData = new ShuffleArray(dataSet);
        dataSet = shuffledData.shuffledArray
        console.log(dataSet[0], this.success)
        let index = 0;
        
        for(let i = 0; i < numberOfFolds; i++){
            if( i == 10 ){
                this.getDataTest(dataSet, dataTest, dataSet.length%10, index); //Si les données ne peuvent pas être divié par 10 (ex: 158 --> 158%10 = 8, un 11ème fold a déja été créer si il y a un reste et pour que toutes les données soient testées )
                
            } else {
                this.getDataTest(dataSet, dataTest, numberDataPerFold, index);
            };
            this.getSuccess(i, this.success, dataTest, dataSet, kMax, distMax);
            
            this.resetData(dataSet, dataTest, index);
            index+=numberDataPerFold;
        };
    };
    
    repeatedCrossValidation(dataSet, dataTest, numberDataPerFold, numberOfFolds, kMax){
        let distMax = this.getDistanceMax()
        for ( let i = 0; i < 10; i++){
        this.crossvalidation(dataSet, dataTest, numberDataPerFold, numberOfFolds, kMax, distMax);
        }
        this.getPercent(numberOfFolds, numberDataPerFold, this.success, kMax);
    }

    /*bestKValue()
    retourne la meilleure valuer de k à utiliser pour l'algorithme
    */
    bestKValue(){       
            return this.percentages.indexOf(Math.max.apply(null, this.percentages ))+1     
    }


    /*start() --> None
    corps principal du programme*/ 
    start(){
        let textController = new HtmlTextController()
        if ( this.data == undefined){
            textController.baseText = "Vous avez oublié de charger le dataSet."
        }
        else {
            textController.baseText = "Le graphe ci-dessous contient sur l'axe des abscisses le paramètre k et sur l'axe des ordonnées le pourcentage de réussite du programme. Plus le programme a réussi à deviner la bonne catégorie avec les k voisins les plus proches, plus le pourcentage est grand. Appuyez plusieurs fois sur le bouton 'Calcul' pour être sûr que la valeur d ek proposée soit constamment la meilleur à choisir.";
            let dataSet = this.data.data
            let dataTest = []
            this.kMax = this.findKMax(dataSet);

            this.reset();

            let foldsController = new FoldsController(dataSet, this.kMax )
            let numberOfFolds = foldsController.numberOfFolds
            let numberDataPerFold = foldsController.dataPerFold
            this.success = foldsController.folds
                 
            let classes = new GetClasses(dataSet);
            this.classes = [...classes.classes]
            
            
            this.repeatedCrossValidation(dataSet, dataTest, numberDataPerFold, numberOfFolds, this.kMax);
            
            
            let chartUpdate = new ChartController({percentages : this.percentages, kMax : this.kMax, textController : textController})
            textController.bestK = "Le meilleur k à choisir dans ce cas est " + String(this.bestKValue())
            this.formController = new FormController()
        }; 
    };
    
    form(){
        // let value = document.querySelector('input[name="option1"]:checked').value --> prend la valeur de l'input qui a comme nom "option1" et qui est selectionné par l'utilisateur 
        let answers = []
        for (let i = 0; i < this.formController.numberOfQuestions; i++){
            let value = document.querySelector('input[name="option'+i+'"]:checked').value
            answers.push(value)
        }
        console.log(answers)
        let dataSet = this.data.data;
        let nearest = this.getKnn(dataSet, answers, this.bestKValue(), this.getDistanceMax())
        console.log(nearest)
        let bestChoice = String(this.arrayToClass(nearest, this.classes))
        console.log(bestChoice)

    };
};