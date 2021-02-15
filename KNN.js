/* class KNN
classe contenant l'algorithme k-NN*/
class KNN{
    constructor(parameters){
        this.params = {
            nN : [],
        }
        for (let k in parameters) {
            this.params[k] = parameters[k];
        };
    };

    



   /*getDistance(array train, array test) --> number
   Retourne la distance euclidienne entre un point et un autre*/
    getDistance(train,test){
        let result = null ;
        for ( let n = 0; n < this.params.dataPoint.length-1; n++){
                
                result += ((Number(train[n])-Number(test[n]))/this.params.distanceMax[n])**2;
               //console.log(train[n], test[n], this.params.distanceMax[n])
        };
        //console.log(Math.sqrt(result))
        
        return Math.sqrt(result);      
       };
       

    /*getNN() --> none
    stock dans un variable globale les k points les plus proches d'un poit donné dans un array ([[point plus proche1], [deuxieme point le plus proche],...])*/
    getNN(){        
        let set = []
        for ( let x = 0; x < this.params.dataArray_KNN.length; x++){
            set.push(this.params.dataArray_KNN[x])
        }
        for ( let j = 0; j < this.params.k ; j++){
            

            
            //choix arbitraire d'un point le plus proche 
            let nearest = set[0];  
            let var3 = null   //index du point le plus proche afin de l'enlever du set
          
            for ( let i=1; i < set.length; i++){
              
                let elementActuel = set[i];
                
                    
                if ( this.getDistance(elementActuel,this.params.dataPoint) < this.getDistance(nearest,this.params.dataPoint)){
                    nearest = elementActuel;
                    var3=i ;
                };
            };
            set.splice(var3,1);
            this.params.nN.push(nearest);
        };

    }; 
};
