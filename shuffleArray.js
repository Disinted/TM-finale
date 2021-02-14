class ShuffleArray {
    /* constructor(array array) --> none
        enregistre le tableau donné et appelle arrayShuffle pour mélanger les éléments du tableau*/
    constructor(array){
        this._array = array;
        this._shuffledArray = [];
        this.arrayShuffle(this._array);
    }

    get shuffledArray(){
        return [...this._shuffledArray];
    }

     /*arrayShuffle(array datas) --> none
    Mélange les données de l'array ( algorithme mélange de Fisher-Yates )*/
    arrayShuffle(datas){
        let dataArray = [...datas];
        for( let i = dataArray.length - 1; i > 0; i--){
            let j = Math.floor(Math.random()*(i+1));
            let actualElement = dataArray[i];
            dataArray[i] = dataArray[j];
            dataArray[j] = actualElement;
        };
        this._shuffledArray = [...dataArray];
    console.log(dataArray, this.shuffledArray)
    };

};