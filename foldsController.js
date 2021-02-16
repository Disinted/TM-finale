class FoldsController{
    constructor(parameters){
        this.params = {};
        for (let k in parameters) {
            this.params[k] = parameters[k];
        };
    }
}