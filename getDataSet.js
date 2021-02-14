class GetDataSet {
    /*constructor(file input-obj) --> none
    enregistre l'objet de l'input et appèle getDataSet pour lire le fichier*/
    constructor(file){
        this._file = file;
        this._data = [];
        this.getDataSet(this._data)
    }

    get data(){
        return [...this._data]
    }

    /* getDataSet(object data) --> none
        enregistre dans un attribut d'instance les données sous forme de tableau de tableaux [[...], [...], [...]]*/
    getDataSet(data){
        //récupération des csv
        
        
        if (this._file && this._file[0]){
        let reader = new FileReader();
        reader.readAsBinaryString(this._file[0]);
        reader.onload = function (e) {        
            let dataFile = e.target.result;  
            let rawData = dataFile.split("\n");
            
            
            
            for ( let x = 0; x < rawData.length; x++){
                data.push(rawData[x].split(","));
                console.log(x, rawData[x].split(","))
                
                };
            };
        };
        console.log(this._data)
    };
        
}