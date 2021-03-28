class DataController {
  /*constructor(file input-obj) --> none
    enregistre l'objet de l'input et appelle getDataSet pour lire le fichier*/
  constructor(file) {
    this._file = file;
    this._data = [];
    this._dataSet = [];
    this._dataTest = [];
    this.getDataSet(this._file);
  }

  get data() {
    return [...this._data];
  }

  get dataSet() {
    return [...this._dataSet];
  }

  get dataTest() {
    return [...this._dataTest];
  }

  /* getDataSet(object data) --> none
        enregistre dans un attribut d'instance les données sous forme de tableau de tableaux [[...], [...], [...]]*/
  getDataSet(file) {
    for (let i = 0; i < file.length; i++) {
      this._data.push(file[i].split(","));
    }
    console.log(this._data);
  }

  /*getDataTest(array dataArray, array dataTestArray) --> none
    Permets de prendre une partie du dataSet mélangé et en faire un set d'entraînement (dataTestArray).*/
  getDataTest(numberOfData, index) {
    let dataArray = this.data;
    let dataTestArray = [];
    let arrayTest = dataArray.slice(index, numberOfData + index);

    for (let i = 0; i < numberOfData; i++) {
      dataTestArray.push(arrayTest[i]);
    }

    dataArray.splice(index, numberOfData);
    this._dataTest = [...dataTestArray];
    this._dataSet = [...dataArray];
  }

  /*resetDataSet() --> none
    Remets à zéro les données du dataSet + dataTest*/
  resetData() {
    this._dataSet = [];
    this._dataTest = [];
  }

  /* arrayShuffle() --> none
    permet de mélanger le dataSet ( algorithme mélange de Fisher-Yates ) */
  arrayShuffle() {
    let dataArray = [...this._data];
    for (let i = dataArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let actualElement = dataArray[i];
      dataArray[i] = dataArray[j];
      dataArray[j] = actualElement;
    }
    this._data = dataArray;
    console.log(this._data[0]);
  }
}
