//const { createWallet} = require("./wallet");

const TronWeb = require('tronweb');

const bodyPaser = require('body-parser');
const express = require('express');



const app = express();

app.use(express.json());
app.use(bodyPaser.urlencoded())
app.use(bodyPaser.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]



app.get('/', (req, res) => {
    res.send('Hello World');
    return;
} );

app.get('/api/courses', (req, res) => {
    res.send([courses]);
    return;
} );

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id))
   if (!course) res.status(404).send('The course ID not found');
   res.send(course);
   return;
} );


app.post('/api/courses', (req, res) => {
   if (!req.body.name || req.body.length < 3){
     res.status(400).send('Name is req. and 3 charac');
     return;
   }
   
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
} );


app.get('/api/wallet', (req, res) => {

const Account = TronWeb.utils.accounts.generateAccount();
const Address = Account.address.base58;
const PrivateKey = Account.privateKey
//const PublicKey = Account.publicKey;
//const Hex = Account.hex;
console.log(Address);
console.log(PrivateKey);

const wallet = [
    { Address: Address , PrivateKey: PrivateKey},
]
res.send(wallet);
return;
} );


    
    app.get('/api/mwallet', async (req, res) => {
        const hdWallet = require('tron-wallet-hd');

        const utils= hdWallet.utils;
        const seed = utils.generateMnemonic();
        const accounts = await utils.generateAccountsWithMnemonic(seed,1);
        
        console.log(seed)
        console.log(accounts)
        
        
        const isValidSeed = utils.validateMnemonic(seed);
        console.log(isValidSeed)

        const mwallet = [
            {Passphrase: seed}, 
            {Account: accounts},     
        ]
        res.send(mwallet);
        return;
        // Generate Address with private key
        /*
        const pk= "b9c12d6d2b9c31d8547d73a6a58291304f6591494d9544bae9a34e06597326af";
        const address = await utils.getAccountFromPrivateKey(pk);
        console.log(address);

        // validate pk
        const pk= "your private key";
        const isValidPK = utils.validatePrivateKey(pk);
         
        // Valid Address
        const isValidAddress1 = utils.validateAddress("Thdhjxhxxbxnbnbnsvsjdb");
        console.log(isValidAddress1) 
        */

        
    }

)







// TRX Send

app.get('/api/send/:privateKey/:ACCOUNT/:AMOUNT', function(req, res) {

 
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");

var privateKey = req.params.privateKey;
var ACCOUNT = req.params.ACCOUNT;
var AMOUNT = req.params.AMOUNT;


   
   const transfer = [
    {privateKey:privateKey},
    {ACCOUNT:ACCOUNT},
   {AMOUNT:AMOUNT} 
]
res.send(transfer);

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


const memo = "tttttttttttttttransfer";

async function main() {

    console.log(tronWeb.defaultAddress.base58, "=>", ACCOUNT);

    const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(ACCOUNT, AMOUNT*1000000);
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
var ACCOUNT = req.params.ACCOUNT;
var AMOUNT = req.params.AMOUNT;
var CONTRACT = req.params.CONTRACT;

   
   const transfer = [
    {CONTRACT:CONTRACT}, 
    {privateKey:privateKey},
    {ACCOUNT:ACCOUNT},
   {AMOUNT:AMOUNT} 
]
res.send(transfer);


const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


async function main() {
    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
    // console.log(JSON.stringify(abi));

    const contract = tronWeb.contract(abi.entrys, CONTRACT);

    const balance = await contract.methods.balanceOf(ACCOUNT).call();
    console.log("balance:", balance.toString());

    const resp = await contract.methods.transfer(ACCOUNT, AMOUNT*1000000).send();
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
    








//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`))





