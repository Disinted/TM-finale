class DataController {
    /*constructor(file input-obj) --> none
    enregistre l'objet de l'input et appelle getDataSet pour lire le fichier*/
    constructor(file){
        this._file = file;
        this._data = [];
        this._dataSet = []
        this._dataTest = []
        this.getDataSet(this._data)
    }

    get data(){
        return [...this._data]
    }

    set data(dataArray){
        this._data = [...dataArray]
    }
    
    get dataSet(){
        return [...this._dataSet]
    }

    get dataTest(){
        return [...this._dataTest]
    }

    /* getDataSet(object data) --> none
        enregistre dans un attribut d'instance les données sous forme de tableau de tableaux [[...], [...], [...]]*/
    getDataSet(data){
        //récupération des csv
        
        
        if (this._file && this._file[0]){
        let reader = new FileReader();
        reader.readAsBinaryString(this._file[0]);
        reader.onload = function (e) {        
            let dataFile = e.target.result;  
            let rawData = dataFile.split("\n");
            
            
            
            for ( let x = 0; x < rawData.length; x++){
                data.push(rawData[x].split(","));
                console.log(x, rawData[x].split(","))
                
                };
            };
        };
        console.log(this._data)
    };
    /*getDataTest(array dataArray, array dataTestArray) --> none
    Permets de prendre une partie du dataSet mélangé et en faire un set d'entraînement (dataTestArray).*/   
    getDataTest( numberOfData, index ){
        let dataArray = [...this.data]
        let dataTestArray = []
        let arrayTest = dataArray.slice(index,numberOfData+index);
        
        for ( let i = 0; i < numberOfData; i++){
            dataTestArray.push(arrayTest[i]);
        };
        
        dataArray.splice(index,numberOfData);
        this._dataTest = [...dataTestArray];
        this._dataSet = [...dataArray];
    };

        /*resetDataSet() --> none
    Remets à zéro les données du dataSet + dataTest*/
    resetData(){
        this._dataSet = []
        this._dataTest = []
    }

    /* shuffleArray() --> none
    permet de mélanger le dataSet */
    shuffleArray(){
        let dataSet = this._data
        let shuffledData = new ShuffleArray(dataSet);
        let shuffledDataSet = shuffledData.shuffledArray
        this._data = [...shuffledDataSet]
        console.log(this._data[0])
    }
        
}