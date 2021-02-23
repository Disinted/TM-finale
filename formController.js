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
        //ajouter autant de questions qu'on le souhaite
        let questions = ["votre âge ?", "votre revenu ?", "votre sexe ?"]
        let possibleAnswers = [[30,35,40],[4500,4300,3900],["homme", "Femme"]]
        let answersValue = [[30,35,40], [4500,4300,3900], [0,1]]
        this._numberOfQuestions = questions.length
        console.log(questions.length, this._numberOfQuestions)
        
        for ( let i = 0; i < questions.length; i++){
            for ( let j = 0; j < possibleAnswers[i].length; j++){
                
                htmlTextToAdd += '<div class="radio"><label><input type="radio" name="option'+i+'" value="'+answersValue[i][j]+'">'+possibleAnswers[i][j]+'</label></div>'
                
            };
        };
        htmlTextToAdd += '<button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button></div>'

        console.log (htmlTextToAdd)
        let textController = new HtmlTextController
        textController.form = htmlTextToAdd//'<div class="card-body"><div class="radio"><label><input type="radio" name="option1" value="30">30</label></div><div class="radio"><label><input type="radio" name="option1" value="35">35</label></div><div class="radio"><label><input type="radio" name="option2" value="2500">2500</label></div><div class="radio"><label><input type="radio" name="option2" value="4500">4500</label></div><div class="radio"><label><input type="radio" name="option3" value="0">Homme</label></div><div class="radio"><label><input type="radio" name="option3" value="1">Femme</label></div><button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button></div>'
                                           //<div class="card-body"><div class="radio"><label><input type="radio" name="option0" value="30">30</label></div><div class="radio"><label><input type="radio" name="option0" value="35">35</label></div><div class="radio"><label><input type="radio" name="option0" value="40">40</label></div><div class="radio"><label><input type="radio" name="option1" value="4500">4500</label></div><div class="radio"><label><input type="radio" name="option1" value="4300">4300</label></div><div class="radio"><label><input type="radio" name="option1" value="3900">3900</label></div><div class="radio"><label><input type="radio" name="option2" value="0">homme</label></div><div class="radio"><label><input type="radio" name="option2" value="1">Femme</label></div><button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button></div>
    };
};

/* code html pour le formulaire ( de manière lisible ) d'exemple
<div class="card-body">

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
    
    <div class="radio">
        <label>
            <input type="radio" name="option3" value="0">
           Homme
        </label>
    </div>
    <div class="radio">
        <label>
            <input type="radio" name="option3" value="1">
           Femme
        </label>
    </div>
    <button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button>
</div>
*/