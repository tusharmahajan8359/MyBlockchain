import {GenerateHash}from "./sha256.js";

var HashArray = [];

function toHash(transactions){
    
    for(let i=0; i<transactions.length; i++){
       
        HashArray.push(GenerateHash(JSON.stringify(transactions[i])))
    }

}



function merkleTree(transactions){
    toHash(transactions);
    
    while(HashArray.length!=1){
        if(HashArray.length %2 !=0){
            HashArray.push(HashArray[HashArray.length-1])
        }
        
        var tempArray = new Array();
        for(let i=0; i<HashArray.length; i=i+2){
            tempArray.push(GenerateHash(HashArray[i]+HashArray[i+1]));
        }
        HashArray = tempArray;
    }
    var merkleRoot = HashArray[0];
    HashArray=[];
    return merkleRoot;
}
  
export {merkleTree };
