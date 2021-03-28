class KMean {
  constructor(datas, classes) {
    this.datas = datas;
    this.classes = classes;
    this._means = [];
    this.OSMeanPerQuestions();
  }
  get means() {
    return [...this._means];
  }
  OSMeanPerQuestions() {
    let datas = [...this.datas];
    let arrayDataPerClass = [];
    this.classes.forEach((className) => {
      let datasInClass = [];
      datas.forEach((data) => {
        if (data[data.length - 1] == className) {
          datasInClass.push(data);
        }
      });
      arrayDataPerClass.push(datasInClass);
    });
    //arrayDataPerClass => reussi
    let meansPerOS = [];

    arrayDataPerClass.forEach((dataArray) => {
      let totalAnswersPerOS = [];
      for (let i = 0; i < dataArray[0].length - 1; i++) {
        totalAnswersPerOS.push(0);
      }

      let OS = undefined;
      dataArray.forEach((data) => {
        OS = data[data.length - 1];

        for (let i = 0; i < data.length - 1; i++) {
          totalAnswersPerOS[i] += Number(data[i]);
        }
      });

      let meanOS = totalAnswersPerOS.map((v) => v / dataArray.length);
      meanOS.push(OS);

      meansPerOS.push(meanOS);
    });
    this._means = [...meansPerOS];
    console.log(this._means);
  }
}
