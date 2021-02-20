class FormController{
    constructor(){
        this._result = [];
        this.formCreation()
    }

    formCreation(){
        let htmlTextToAdd = '<div class="card-body">'
        //ajouter autant de questions qu'on le souhaite
        let questions = ["votre âge ?", "votre revenu ?", "votre sexe ?"]
        
        

        let textController = new HtmlTextController
        textController.form = '<div class="card-body"><div class="radio"><label><input type="radio" name="option1" value="yeet1">yeet boi</label></div><div class="radio"><label><input type="radio" name="option1" value="yeet2">yeet giwl</label></div><button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button></div>'

    };
};

/* code html pour le formulaire ( de manière lisible )
<div class="card-body">
    <div class="radio">
        <label>
            <input type="radio" name="option1" value="yeet1">
            yeet boi
        </label>
    </div>

    <div class="radio">
        <label>
            <input type="radio" name="option1" value="yeet2">
            yeet giwl
        </label>
    </div>
    <button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button>
</div>
*/