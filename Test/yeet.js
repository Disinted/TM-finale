function getDistance(train,test, distanceMax){
    let result = null ;
    for ( let n = 0; n < train.length-1; n++){
            
            result += ((Number(train[n])-Number(test[n]))/distanceMax[n])**2;
           console.log(result, distanceMax[n], test[n], train[n])
    };
    console.log(Math.sqrt(result))
    
    return Math.sqrt(result);      
   };
let train = ["35","1600","0","oui"]
let test = ["20","1400","1", "non"]
let distanceMax = [40, 8600, 1]
getDistance(train, test, distanceMax)