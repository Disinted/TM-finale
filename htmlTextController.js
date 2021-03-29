class HtmlTextController {
  constructor() {}
  //mettre le getElementById avec des attributs d'instance ne fonctionne pas.

  set baseText(texte) {
    document.getElementById("baseText").classList.remove("text-center");
    document.getElementById("baseText").innerHTML = texte;
  }
  set showBaseTextAndKChart(boolean) {
    document.getElementById("baseText").hidden = boolean;
    document.getElementById("interface-place").hidden = boolean;
    document.getElementById("bestKTextPlace").hidden = boolean;
  }
  set bestK(texte) {
    document.getElementById("bestKTextPlace").innerHTML =
      '<div class="card-body" id="bestK" ></div>';
    document.getElementById("bestKTextPlace").hidden = false;
    document.getElementById("bestK").innerHTML = texte;
  }
  set textForMeanChart(texte) {
    document.getElementById("textForMeanChart").hidden = false;
    document.getElementById("textForMeanChart").innerHTML =
      "<div class='card-body'>" + texte + "</div>";
  }
  set canvas(htmlCanvas) {
    document.getElementById("interface-place").innerHTML =
      '<div class="card-body" id="interface" ></div>';
    document.getElementById("interface-place").hidden = false;
    document.getElementById("interface").innerHTML = htmlCanvas;
  }

  set form(htmlForm) {
    document.getElementById("form-place").innerHTML = htmlForm;
    document.getElementById("form-place").hidden = false;
  }
  set bestOption(option) {
    document.getElementById("form-place").innerHTML =
      "<p class='text-center'  id='bestOption'> L'algorithme k-NN vous recommende de choisir l'option " +
      option +
      "</p> <div class='text-center'><button type='input'  class='btn btn-warning' onclick='OSRecommender.resetProgram()' >Refaire le questionnaire</button></div>";
  }

  set showMeanChartAndText(boolean) {
    document.getElementById("meanChart").hidden = boolean;
    document.getElementById("chartText").hidden = boolean;
    document.getElementById("chartCanvas").hidden = boolean;
  }
}
