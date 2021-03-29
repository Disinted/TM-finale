class Mean {
  constructor(datas, classes) {
    this.datas = datas;
    this.classes = classes;
    this._means = [];
    this.OSMeanPerQuestion();
    this._percentages;
  }

  get percentages() {
    return [...this._percentages];
  }
  get means() {
    return [...this._means];
  }
  /*OSMeanPerQuestion() --> none
   met sous forme de tableau les moyennes des reponses par question avec en dernier l'OS auquel appartiennent les moyennes, tout les tableaux sont regroupe dans un grand tableau*/
  OSMeanPerQuestion() {
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

    this.arrayObjectOSMeanPerQuestion(meansPerOS);
  }
  /*arrayObjectOSMeanPerQuestion(array means) --> none
  Met sous forme d'objet les tableaux contenant les moyennes : name -> OS, data -> tableau avec toutes les moyennes. */
  arrayObjectOSMeanPerQuestion(means) {
    let arrayObjectMeans = [];
    means.forEach((dataArray) => {
      let OSobject = { name: dataArray[dataArray.length - 1] };

      OSobject.data = dataArray.slice(0, dataArray.length - 1);
      arrayObjectMeans.push(OSobject);
    });
    this._means = arrayObjectMeans;
  }
  /*percentageOfProximityPerOS(array arrayDataObject, array answers, int distMax) --> none
  met dans un tableau des objets contenant : name -> OS, percentage -> pourcentage d'affinite de l'utilisateur par rapport aux moyennes des reponses par OS */
  percentageOfProximityPerOS(arrayDataObject, answers, distMax) {
    let percentagePerOS = [];

    let data = [];
    arrayDataObject.forEach((objectOSdata) => {
      let objectOS = { name: objectOSdata.name };
      for (let i = 0; i < objectOSdata.data.length; i++) {
        let distance = Math.abs(objectOSdata.data[i] - answers[i]);
        data.push(1 - distance / distMax[i]);
      }

      let percentage = 0;
      data.forEach((value) => {
        percentage += value;
      });
      objectOS.percentage = percentage /= data.length;
      percentagePerOS.push(objectOS);
    });
    this._percentages = [...percentagePerOS];
  }
}
