class HtmlTextController{
    constructor(){
    }
    //mettre le getElementById avec des attributs d'instance ne fonctionne pas.


    set baseText(texte){
        document.getElementById("baseText").innerHTML = texte
    }

    set bestK(texte){
        document.getElementById('bestKTextPlace').innerHTML = '<div class="card-body" id="bestK" ></div>'
        document.getElementById('bestKTextPlace').hidden = false
        document.getElementById('bestK').innerHTML = texte
    }
    
    set canvas(htmlCanvas){
        document.getElementById('interface-place').innerHTML = '<div class="card-body" id="interface" ></div>'
        document.getElementById('interface-place').hidden = false
        document.getElementById('interface').innerHTML = htmlCanvas;
    }
    
    set form(htmlForm){
        document.getElementById('form-place').innerHTML =  htmlForm
        document.getElementById('form-place').hidden = false
    }
}