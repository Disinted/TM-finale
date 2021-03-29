class GetClasses {
  /*constructor (array datas) --> none
        enregistre le tableau donnes et appelle getClasses*/
  constructor(datas) {
    this._datas = datas;
    this._classes = [];
    this.getClasses();
  }

  get classes() {
    return [...this._classes];
  }

  /*getClasses() --> none
        enregistre dans un attribut d'instance les étiquettes/categories presentes dans le set de donnees*/
  getClasses() {
    let datas = [...this._datas];
    let classes = [];

    for (let i = 0; i < datas.length; i++) {
      let cluster = datas[i][datas[i].length - 1];
      let flag = true;

      for (let j = 0; j < classes.length; j++) {
        if (cluster.trim() == classes[j].trim()) {
          //pour eviter de retrouver plusieurs fois les memes etiquettes au fur et a mesure qu'on en ajoute
          flag = false;
          break;
        }
      }

      if (flag == true) {
        classes.push(cluster);
      }
    }

    this._classes = [...classes];
  }
}
