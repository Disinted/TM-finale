class GetDataSet {

    constructor(file){
        this._file = file;
        this._data = [];
        this.getDataSet();
    }

    get data(){
        return [...this._data]
    }
    getDataSet(){
        //récupération des csv
        console.log(this.file)
        if (this.file&& this.file[0]) {
            let reader = new FileReader();
            reader.readAsBinaryString(this.file[0]);
            reader.onload = function (e) {        
                let dataFile = e.target.result;  
                let rawData = dataFile.split("\n");
                let data = []
                console.log(rawData)
                for ( let x = 0; x < data.length; x++){
                    data.push(rawData[x].split(","));

                };
                this._data = [...data]
                console.log(data)
            };
        };
        console.log(this.data)
    }
}