//const { createWallet} = require("./wallet");
const { PrivateKey } = require("bitcore-lib");
const Mnemonic = require("bitcore-mnemonic");


const TronWeb = require('tronweb');

const bodyPaser = require('body-parser');
const express = require('express');



const app = express();

app.use(express.json());
app.use(bodyPaser.urlencoded())
app.use(bodyPaser.json());


// get Address tronweb
app.get('/api/mtronweb', (req, res) => {
    const RandomAccount = TronWeb.createRandom()
    
    res.json(RandomAccount);
    return;
} );

// get Address tronweb
app.get('/api/tronwebPk/:PrivateKey', (req, res) => {

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

var privateKey = req.params.PrivateKey;

    const address = tronWeb.address.fromPrivateKey(privateKey);
    
    res.json(address);
    return;
} );






// TRX Send

app.get('/api/send/:privateKey/:ACCOUNT/:AMOUNT', function(req, res) {

 
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");

var privateKey = req.params.privateKey;
var receiveaddress = req.params.ACCOUNT;
var amount = req.params.AMOUNT;


   
   const transfer = [
    {privateKey:privateKey},
    {receiveaddress:receiveaddress},
   {amount:amount} 
]
res.send(transfer);

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


const memo = "tttttttttttttttransfer";

async function main() {

    console.log(tronWeb.defaultAddress.base58, "=>", receiveaddress);

    const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(receiveaddress, amount*1000000);
    const unSignedTxnWithNote = await tronWeb.transactionBuilder.addUpdateData(unSignedTxn, memo, 'utf8');
    const signedTxn = await tronWeb.trx.sign(unSignedTxnWithNote);
    console.log("signed =>", signedTxn);
    const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
    console.log("broadcast =>", ret);
}

main().then(() => {
        console.log("ok");
    })
    .catch((err) => {
        console.log("error:", err);
    });

    return;   
    } );





    // USDT send

app.get('/api/sendusdt/:privateKey/:CONTRACT/:ACCOUNT/:AMOUNT', function(req, res) {
        

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
// const fullNode = new HttpProvider("http://192.168.1.162:8090");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");

var privateKey = req.params.privateKey;
var receiveaddress = req.params.ACCOUNT;
var amount = req.params.AMOUNT;
var CONTRACT = req.params.CONTRACT;

   
   const transfer = [
    {CONTRACT:CONTRACT},
    {privateKey:privateKey},
    {receiveaddress:receiveaddress},
   {amount:amount} 
]
res.send(transfer);
  

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


async function main() {
    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
    // console.log(JSON.stringify(abi));

    const contract = tronWeb.contract(abi.entrys, CONTRACT);

    const balance = await contract.methods.balanceOf(receiveaddress).call();
    console.log("balance:", balance.toString());

    const resp = await contract.methods.transfer(receiveaddress, amount*1000000).send();
    console.log("transfer:", resp);
 }

   main().then(() => {
        console.log("ok");
    })
    .catch((err) => {
        console.log("error:", err);
    });
    
 return;
});



// Get Tron USDC Balance

app.get('/api/usdc_balance/:privateKey/:CONTRACT/:Address', function(req, res) {

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    // const fullNode = new HttpProvider("http://192.168.1.162:8090");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");

    var privateKey = req.params.privateKey;
    var address = req.params.Address;
    var CONTRACT = req.params.CONTRACT;
    
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    
    
    async function main() {
        const {abi} = await tronWeb.trx.getContract(CONTRACT);
        const contract = tronWeb.contract(abi.entrys, CONTRACT);
        const balance = await contract.methods.balanceOf(address).call();
        console.log("balance:", balance.toString());
    res.send(balance.toString());
    }
    main().then(() => {
        console.log("ok");
    })
    .catch((err) => {
        console.log("error:", err);
    });
      
     return;
    });


    // USDC send

app.get('/api/sendusdc/:privateKey/:CONTRACT/:ACCOUNT/:AMOUNT', function(req, res) {
        

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    // const fullNode = new HttpProvider("http://192.168.1.162:8090");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    
    var privateKey = req.params.privateKey;
    var receiveaddress = req.params.ACCOUNT;
    var amount = req.params.AMOUNT;
    var CONTRACT = req.params.CONTRACT;
    
       
       const transfer = [
        {CONTRACT:CONTRACT},
        {privateKey:privateKey},
        {receiveaddress:receiveaddress},
       {amount:amount} 
    ]
    res.send(transfer);
      
    
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    
    
    async function main() {
        const {
            abi
        } = await tronWeb.trx.getContract(CONTRACT);
        // console.log(JSON.stringify(abi));
    
        const contract = tronWeb.contract(abi.entrys, CONTRACT);
    
        const balance = await contract.methods.balanceOf(receiveaddress).call();
        console.log("balance:", balance.toString());
    
        const resp = await contract.methods.transfer(receiveaddress, amount*1000000).send();
        console.log("transfer:", resp);
     }
    
       main().then(() => {
            console.log("ok");
        })
        .catch((err) => {
            console.log("error:", err);
        });
        
     return;
    });


 




// Error
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status(404);
    next(error);
    return;
})

app.use((error,req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
    return;
});




//PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listen on port ${port}`))






