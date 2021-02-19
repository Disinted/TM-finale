class FoldsController{
    constructor(dataSet, kMax){
        this._dataSet = dataSet;
        this._folds = [];
        this._kMax = kMax;
        this._numberOfFolds = 0;
        this.createFolds(this.numberFolds(this._dataSet));
    };
    get numberOfFolds(){
        return this._numberOfFolds;
    };
    get dataPerFold(){
        return Math.floor(this._dataSet.length/10);
    };
    get folds(){
        return [...this._folds];
    };

    /*numberFolds() --> int
    Donne le nombre de folds dont on aura besoin pour le dataset.*/
    numberFolds(dataSet){
        let numberOfFolds = 10;
        if ( dataSet.length % 10 != 0 ){ //Pour éviter de laisser certains données sans les tester --> sur 158 données, 8 données ne pourraient pas être testé si on divise par 10 --> création d'un 11ème fold avec le reste
            numberOfFolds = 11;
        };
        this._numberOfFolds = numberOfFolds
        return numberOfFolds
    };

    createFolds(numberOfFolds){
        let folds = []
        for(let i = 0; i < numberOfFolds; i++){

            folds.push([]);
            for(let k = 0; k < this._kMax ; k++){

                folds[i].push(0);

            };                  
        };
        this._folds = [...folds]
    };


};