class FormController{
    constructor(){
        this._result = [];
        this._numberOfQuestions = 0
        this.formCreation()
        
    }
    get numberOfQuestions(){
        return this._numberOfQuestions
    }
    formCreation(){
        let htmlTextToAdd = '<div class="card-body">'
        //ajouter autant de questions / réponses possibles / valeur de la réponse qu'on le souhaite
        let questions = ["votre âge ?", "votre revenu ?", "votre sexe ?"]
        let possibleAnswers = [[30,35,40],[4500,4300,3900],["homme", "Femme"]] //un [] = un set de réponses possibles pour une question
        let answersValue = [[30,35,40], [4500,4300,3900], [0,1]] //même que possibleAnswers mais pour la valeur de retour
        this._numberOfQuestions = questions.length
        console.log(questions.length, this._numberOfQuestions)
        
        for ( let i = 0; i < questions.length; i++){
            htmlTextToAdd += '<h2 class="mb-3">'+questions[i]+'</h2>'
            for ( let j = 0; j < possibleAnswers[i].length; j++){ //Certaines questions peuvent avoir plus ou moins de réponses possibles que d'autres
                
                htmlTextToAdd += '<div class="radio"><label><input type="radio" name="option'+i+'" value="'+answersValue[i][j]+'">'+possibleAnswers[i][j]+'</label></div>'
                
            };
        };
        htmlTextToAdd += '<button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button></div>'

        console.log (htmlTextToAdd)
        let textController = new HtmlTextController
        textController.form = htmlTextToAdd 
       
    };
};

/* code html pour le formulaire ( de manière lisible ) d'exemple
<div class="card-body">
    <h2 class="mb-3">
        votre âge ?
    </h2>
    <div class="radio">
        <label>
            <input type="radio" name="option1" value="30">
            30
        </label>
    </div>
    <div class="radio">
        <label>
            <input type="radio" name="option1" value="35">
            35
        </label>
    </div>
    <h2 class="mb-3">
        votre revenu ?
    </h2>
    <div class="radio">
        <label>
            <input type="radio" name="option2" value="2500">
            2500
        </label>
    </div>
    <div class="radio">
        <label>
            <input type="radio" name="option2" value="4500">
            4500
        </label>
    </div>
    <div etc...
    <button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button>
</div>
*/