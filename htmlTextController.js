class HtmlTextController {
  constructor() {}
  //mettre le getElementById avec des attributs d'instance ne fonctionne pas.

  set baseText(texte) {
    document.getElementById("baseText").innerHTML = texte;
  }

  set bestK(texte) {
    document.getElementById("bestKTextPlace").innerHTML =
      '<div class="card-body" id="bestK" ></div>';
    document.getElementById("bestKTextPlace").hidden = false;
    document.getElementById("bestK").innerHTML = texte;
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
      "<p class='text-center'  id='bestOption'> Le programme vous recommende de choisir l'option " +
      option +
      "</p> <div class='text-center'><button type='input'  class='btn btn-warning' onclick='bestKFinder.resetForm()' >Refaire le questionnaire</button></div>";
  }

  set barCharts(questionNumber) {
    document.getElementById("chartBoi2").innerHTML +=
      "<div id='chart" + questionNumber + "'>" + questionNumber + "</div>";
  }
}
