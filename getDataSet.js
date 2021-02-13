class GetDataSet {

    constructor(file){
        this._file = file;
        this._data = [];
        this.getDataSet(this._data)
    }

    get data(){
        return [...this._data]
    }


    getDataSet(data){
        //récupération des csv
        
        console.log(this._file)
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