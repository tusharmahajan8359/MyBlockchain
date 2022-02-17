import { GenerateHash} from "./Nsha256.js";
import {merkleTree} from "./markleTree.js"

const add1=document.querySelector(".addtoblock")
const add2=document.querySelector(".pushtoblock")
const add3=document.querySelector(".viewblockchain") 
const add4=document.querySelector(".pendTransation")

class Transation{
    constructor(from,to,amount){
      this.from=from;
      this.to=to;
      this.amount=amount;
    }
}

class Block{

    constructor(index,data,previousHash=''){
        this.index=index;
        this.timestamp=this.liveTime();
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
        console.log("create block");
    }

    calculateHash(){
       
        return GenerateHash(this.index + this.previousHash +this.timestamp+merkleTree(this.data)+this.nonce);
    }
    liveTime(){
        let today = new Date()
        let date = today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return (date+' '+time);
    }
    mineBlock(difficulty){
    
       while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
       console.log("Block mined     "+this.hash);
    }

}

class Blockchain{                               
    constructor(){                                
        this.chain=[this.createGenesisBlock()];    
        this.difficulty=2;

    }
    createGenesisBlock(){
        return new Block(0,"genesis block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addblock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        //newBlock.hash=newBlock.calculateHash()
         newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        
    }
    isChainValid(){
        for (let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
      return true;  
    }
}

var bchain=new Blockchain();
let myTransations=[];
let i=0;

// document.getElementById("addtoblock")


function addToBlock1(){
   
    let f=document.getElementById("from").value ;
    let t=document.getElementById("too").value ;
    let a=document.getElementById("amount").value ;
    myTransations.push(new Transation(f,t,a));
    // console.log("ok")

}

function pushToBlock(){
    bchain.addblock(new Block(++i,myTransations));
    myTransations=[];
}
function showBlockchain(){
  document.getElementById("viewBchain").value=JSON.stringify(bchain,null,4);
}
function pendingTransation(){
    document.getElementById("pendingtrn").value=JSON.stringify(myTransations,null,4);
}


add1.addEventListener('click',()=>{
     addToBlock1();

})
add2.addEventListener('click',()=>{
    pushToBlock()

})
add3.addEventListener('click',()=>{
    showBlockchain()

})
add4.addEventListener('click',()=>{
    pendingTransation()
})




