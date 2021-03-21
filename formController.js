class FormController{
    constructor(array){
        this.questionsData = array
        this._result = [];
        this._numberOfQuestions = 0
        this.formCreation()
        
    }
    get numberOfQuestions(){
        return this._numberOfQuestions
    }
    formCreation(){
        let textController = new HtmlTextController()
        let htmlTextToAdd = '<div class="card-body">'
        //ajouter autant de questions / réponses possibles / valeur de la réponse qu'on le souhaite
        
        let questions = [] 
        let possibleAnswers = [] 
        let answersValue = [] 
        
        let questionsData = [...this.questionsData]
        console.log(questionsData)
        for ( let j = 0; j < 3; j++){
            let i = 0
            i+=j
            let typeOfValue = [questions, possibleAnswers, answersValue]
            
            do{
                typeOfValue[j].push(questionsData[i]);
                i+=3
            } while( i < questionsData.length)
        }

        
        this._numberOfQuestions = questions.length

        htmlTextToAdd += '<div id = "formQuestions0">'+questions[0][0].substring(2,)+'</div>' //Pour éviter l'affichage du BOM au début (UTF-16)
        let questionsID = ["formQuestions0"] //Pour appliquer un style css pour toute les questions par après ( avec .forEach )
        for ( let i = 0; i < questions.length; i++){
            if ( i != 0 ){
                htmlTextToAdd += '<div id = "formQuestions'+i+'">'+questions[i]+'</div>'
                questionsID.push('formQuestions'+i)
            }
            
            
            for ( let j = 0; j < possibleAnswers[i].length; j++){ //Certaines questions peuvent avoir plus ou moins de réponses possibles que d'autres
                
                htmlTextToAdd += '<div class="radio"><label><input type="radio" name="option'+i+'" value="'+answersValue[i][j]+'" checked>'+possibleAnswers[i][j]+'</label></div>'
                
            };
        };
        htmlTextToAdd += '<button type="input"  class="btn btn-warning" onclick="bestKFinder.form()" >Submit</button></div>'

        textController.form = htmlTextToAdd;
        
        questionsID.forEach(function(id){
            let questionsCSS = document.getElementById(id).style
            questionsCSS.fontVariant = "small-caps"
            questionsCSS.margin = "40px 0px 20px"
            questionsCSS.fontSize = "x-large"

        })
    };
};

/* code html pour le formulaire ( de manière lisible ) d'exemple
<div class="card-body">
    <p id = "formQuestions" >
        votre âge ?
    </p>
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
    <p id = "formQuestions">
        votre revenu ?
    </p>
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