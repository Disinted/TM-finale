class Controller {
  constructor() {
    this.classes = [];
    this.success = [];
    this.kNNPercentages = [];
    this.kMax = undefined;
  }

  /*getDataSet(csv file) --> none
    Recuperation des donnees*/
  getDataSet(file) {
    this.data = new DataController(file.split("\n"));
  }

  /*arrToClass(array arr, arr className, boolean flag) --> array / string
    retourne la classe la plus representee, ou "undefined". Si flag = true => mode de prediction pour le questionnaire => si plusieurs options ont un nombre egal de representations, permet de les afficher tous */
  arrayToClass(arr, className, flag) {
    let compare = [];
    for (let p = 0; p < className.length; p++) {
      compare.push(0);
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < className.length; j++) {
        if (arr[i][arr[0].length - 1].trim() == className[j].trim()) {
          compare[j] += 1;
        }
      }
    }

    let highestNumber = Math.max.apply(null, compare); //Va chercher le plus grand nombre parmi compare (ex: [0,2,3] --> 3)
    /*numberOfOccurence(array array, int value) --> int
           verifie si le plus grand nombre dans array apparait plusieurs fois (ex: [0,4,4] --> 2 (array = [0,4,4], value = 4), [0,2,5] --> 1)*/
    function numberOfOccurence(array, value) {
      var count = 0;
      array.forEach((v) => v === value && count++);
      return count;
    }

    if (1 == numberOfOccurence(compare, highestNumber) && flag != true) {
      return className[compare.indexOf(highestNumber)]; // -> string
    } else if (1 == numberOfOccurence(compare, highestNumber) && flag == true) {
      return [className[compare.indexOf(highestNumber)]]; // ->array
    } else if (1 != numberOfOccurence(compare, highestNumber) && flag == true) {
      //Pour le conseil final apres le questionnaire, en cas de conflit de choix ( exemple : 1OS BIC, 4OS espagnol, 4OS Grec -> retourne les OS espagnol et grec)
      let i = 0;
      let numberOfOccurences = numberOfOccurence(compare, highestNumber);
      let classes = [];
      while (numberOfOccurences > i) {
        classes.push(className[compare.indexOf(highestNumber)]);
        compare[compare.indexOf(highestNumber)] = 0;
        i += 1;
      }
      return classes;
    } else {
      return "undefined";
    }
  }

  /*getDistanceMax() --> array
    Permet de trouver la distance maximale entre deux donnees donnees. Calcule dans le controller pour eviter de calculer plusieurs fois les distances.
    */
  getDistanceMax() {
    let dataSet = this.data.data;
    let numberOfInformation = dataSet[0].length - 1; //[0,1,2,cluster] --> 3 informations
    let shortestArray = [];
    let highestArray = [];
    let distanceMax = [];

    for (let i = 0; i < numberOfInformation; i++) {
      //[0,1,2] index des info
      shortestArray[i] = Number(dataSet[0][i]);
      highestArray[i] = Number(dataSet[0][i]);
      for (let j = 1; j < dataSet.length; j++) {
        //dataSet [1,2,3,cluster]

        if (Number(dataSet[j][i]) < shortestArray[i]) {
          shortestArray[i] = Number(dataSet[j][i]);
        } else if (Number(dataSet[j][i]) > highestArray[i]) {
          highestArray[i] = Number(dataSet[j][i]);
        }
      }
    }

    for (let i = 0; i < numberOfInformation; i++) {
      distanceMax.push(highestArray[i] - shortestArray[i]);
    }

    return distanceMax;
  }

  /* getKnn(array dataArray, array point, int kMax, arr distMax) --> array
    revoie les k donnees les plus proches d'une autre donnee sous forme de tableau ( algorithme K-NN )
    */
  getKnn(dataArray, point, kMax, distMax) {
    let knn = new KNN({
      dataArray_KNN: dataArray,
      dataPoint: point,
      k: kMax,
      distanceMax: distMax,
    });
    knn.getNN();

    return knn.params.nN;
  }

  /*getSuccess(int fold, array success, array dataTest, array dataSet, int kMax, array distMax) --> None
    Permets de stocker dans un objet global le nombre de bonnes predictions par l'algorithme par valeur de k*/
  getSuccess(fold, success, dataTest, dataSet, kMax, distMax) {
    for (let i = 0; i < dataTest.length; i++) {
      let nearest = this.getKnn(dataSet, dataTest[i], kMax, distMax);
      for (let k = 0; k < kMax; k++) {
        let arr1 = undefined;
        let arr2 = [];

        arr1 = nearest.slice(0, k + 1); // [nearest1], [nearest1, nearest2], ...

        arr2.push(this.arrayToClass(arr1, this.classes)); // [cluster]

        if (arr2[0].trim() == dataTest[i][dataTest[0].length - 1].trim()) {
          success[fold][k] += 1;
        }
      }
    }
  }

  /*getPercent(int numberOfFolds, int numberDataPerFold, array success, int kMax) --> None
    Mets en pourcentage le nombre de reussites par parametre k et le stock dans un autre objet global*/
  getPercent(numberOfFolds, numberDataPerFold, success, kMax) {
    for (let j = 0; j < kMax; j++) {
      let subtotal = 0;

      for (let i = 0; i < numberOfFolds; i++) {
        subtotal += success[i][j];
      }

      this.kNNPercentages.push(
        ((subtotal / (numberOfFolds * numberDataPerFold)) * 100) / 10
      ); // le /10--> nombre de repetition crossvalidation
    }
  }

  /*reset() --> none
    remet à zero les resultats finaux du programme*/
  reset() {
    this.success = [];
    this.kNNPercentages = [];
  }

  /*crossvalidation(int numberDataPerFold, int numberOfFolds, int kMax, array distMax) --> none
    estimation de la fiabilite du programme*/
  crossvalidation(numberDataPerFold, numberOfFolds, kMax, distMax) {
    this.data.arrayShuffle();
    let index = 0;
    let dataSet;
    let dataTest;
    for (let i = 0; i < numberOfFolds; i++) {
      if (i == 10) {
        this.data.getDataTest(this.data.data.length % 10, index); //Si les donnees ne sont pas divisible par 10 (ex: 158 --> 158%10 = 8, un 11eme fold a deja ete creer si il y a un reste et pour que toutes les donnees soient testees )
      } else {
        this.data.getDataTest(numberDataPerFold, index);
      }
      dataSet = this.data.dataSet;
      dataTest = this.data.dataTest;
      this.getSuccess(i, this.success, dataTest, dataSet, kMax, distMax);

      this.data.resetData();
      index += numberDataPerFold;
    }
  }
  /* repeatedCrossValidation(int numberDataPerFold, int numberOfFolds, int kMax) --> none
    permet de repeter la crossvalidation dix fois et d'avoir le pourcentage de reussite du programme*/
  repeatedCrossValidation(numberDataPerFold, numberOfFolds, kMax) {
    let distMax = this.getDistanceMax();
    for (let i = 0; i < 10; i++) {
      this.crossvalidation(numberDataPerFold, numberOfFolds, kMax, distMax);
    }
    this.getPercent(numberOfFolds, numberDataPerFold, this.success, kMax);
  }

  /*bestKValue()
    retourne la meilleure valeur de k à utiliser pour l'algorithme
    */
  bestKValue() {
    return (
      this.kNNPercentages.indexOf(Math.max.apply(null, this.kNNPercentages)) + 1
    );
  }

  /*start() --> None
    lance le programme et la prediction du meilleur k à choisir pour un set de donnees deja charge*/
  start() {
    this.textController = new HtmlTextController();

    this.textController.baseText =
      "Le graphe ci-dessous contient sur l'axe des abscisses le paramètre k et sur l'axe des ordonnées le pourcentage de réussite du programme. Plus le programme a réussi à deviner la bonne catégorie avec les k voisins les plus proches, plus le pourcentage est grand. Appuyez plusieurs fois sur le bouton 'Calcul' pour être sûr que la valeur proposée soit constamment la meilleur à choisir.";
    let dataSet = this.data.data;
    this.kMax = Math.floor(Math.sqrt(dataSet.length));

    let foldsController = new FoldsController(dataSet, this.kMax);
    let numberOfFolds = foldsController.numberOfFolds;
    let numberDataPerFold = foldsController.dataPerFold;
    this.success = foldsController.folds;

    let classes = new GetClasses(dataSet);
    this.classes = [...classes.classes];

    this.repeatedCrossValidation(numberDataPerFold, numberOfFolds, this.kMax);
    this.mean = new Mean(dataSet, this.classes);
    this.chartController = new ChartController({
      percentages: this.kNNPercentages,
      kMax: this.kMax,
      textController: this.textController,
      classes: this.classes,
      dataSet: dataSet,
      mean: this.mean,
    });

    this.textController.bestK =
      "Le meilleur k à choisir dans ce cas est " + String(this.bestKValue());
    this.formController = new FormController(this.questions.data);
  }
  /*stockQuestions(csv file) --> none
  Recuperation des questions, reponses et valeur des reponses pour le formulaire*/
  stockQuestions(file) {
    this.questions = new DataController(file.split("\n"));
  }
  /*form() --> none
  donne les meilleurs choix d'apres l'algorithme kNN et la distnace par rapport aux moyennes des reponses par OS, selon les reponses de l'utilisateur au formulaire*/
  form() {
    // let value = document.querySelector('input[name="option1"]:checked').value --> prend la valeur de l'input qui a comme nom "option1" et qui est selectionne  par l'utilisateur
    let answers = [];
    for (let i = 0; i < this.formController.numberOfQuestions; i++) {
      let value = document.querySelector(
        'input[name="option' + i + '"]:checked'
      ).value;
      answers.push(value);
    }

    let dataSet = this.data.data;
    let nearest = this.getKnn(
      dataSet,
      answers,
      this.bestKValue(),
      this.getDistanceMax()
    );

    let possibleChoices = this.arrayToClass(nearest, this.classes, true);
    let bestChoiceText = "";

    if (possibleChoices.length > 1) {
      let text = "";
      possibleChoices.forEach((OS) => {
        text += OS + " ou ";
      });
      bestChoiceText += text
        .substr(0, text.length - 5 /* -5 pour enlever le " ou " final */)
        .toLowerCase();
    } else {
      bestChoiceText = possibleChoices[0].toLowerCase();
    }
    this.textController.bestOption = bestChoiceText;
    document.getElementById("bestOption").style.textDecoration = "underline";
    document.getElementById("bestOption").style.fontSize = "large";

    //Prediction avec la moyenne des reponses par OS

    this.mean.percentageOfProximityPerOS(
      this.mean.means,
      answers,
      this.getDistanceMax()
    );
    this.chartController.affinityPercentagePerOSChart(this.mean.percentages);
  }

  /*resetForm() --> none
  reaffiche le questionnaire et enleve le graphe d'affinité par la moyenne des reponses par OS*/
  resetForm() {
    this.textController.form = this.formController.formHTML;
    this.chartController.destroyMeanAffinityChart();
  }
}
