//const { createWallet} = require("./wallet");
const { PrivateKey } = require("bitcore-lib");
const Mnemonic = require("bitcore-mnemonic");
const TronWeb = require('tronweb');
//const hdWallet = require('tron-wallet-hd');
const Address =  require ('tron-address-mnemonic');

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

// get Address tronweb
app.get('/api/mtronweb', (req, res) => {
    const RandomAccount = TronWeb.createRandom()
    
    res.json(RandomAccount);
    return;
} );


app.get('/api/wallet', (req, res) => {

    const Account = TronWeb.utils.accounts.generateAccount();
    const Address = Account.address.base58;
    const PrivateKey = Account.privateKey;
    //const PublicKey = Account.publicKey;
    //const Hex = Account.hex;
    
    
    console.log(Address);
    console.log(PrivateKey);
    
    const wallet = [
        {Account: Account},
        { Address: Address} , 
        {PrivateKey: PrivateKey},
    ]
    res.json(wallet);
    return;
    } );


    

// tron mnemonic wallet create
    
    app.get('/api/mwallet', async (req, res) => {
        
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

    })
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

        
  
 

app.get('/api/m2wallet/', (req, res) => {
     
 const mnemonic = Address.generateMnemonic();
//console.log(mnemonic);
 const address = new Address(mnemonic, 0);
//console.log(address.master);
 const addressInfo =  address.masterInfo;
 console.log(addressInfo);
//console.log(address.createAddress())
    
const m2wallet = [
    {addressInfo},
]
res.send(m2wallet);

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


// TRX Send Gas fee

app.get('/api/sendgas/:privateKey/:BACCOUNT/:BAMOUNT', function(req, res) {

 
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    
    var privateKey = req.params.privateKey;
    var bossaddress = req.params.BACCOUNT;
    var bamount = req.params.BAMOUNT;
    
    
       
       const transfer = [
        {privateKey:privateKey},
        {bossaddress:bossaddress},
       {bamount:bamount} 
    ]
    res.send(transfer);
    
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    
    
    const memo = "tttttttttttttttransfer";
    
    async function main() {
    
        console.log(tronWeb.defaultAddress.base58, "=>", bossaddress);
    
        const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(bossaddress, bamount*1000000);
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


// getBalance

app.get('/api/balance/:privateKey/:CONTRACT/:Address', function(req, res) {
        

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    // const fullNode = new HttpProvider("http://192.168.1.162:8090");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    
    var privateKey = req.params.privateKey;
    var CONTRACT = req.params.CONTRACT;
    var Address = req.params.Address;
    
       
       const details = ([
        {privateKey:privateKey},
        {CONTRACT:CONTRACT},
        {Address:Address}, 

    ])
    res.json(details);

   
    
    
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    
   
    async function main() {
        
        const {
            abi
        } = await tronWeb.trx.getContract(CONTRACT);
        // console.log(JSON.stringify(abi));
    
        const contract = tronWeb.contract(abi.entrys, CONTRACT);
          
        const balance = (await contract.methods.balanceOf(Address).call());
        console.log("balance:", balance.toString());
        
        const detailb = ([
            {balance:balance}, 
    
        ])
        res.end(detailb);
        
     }
       main().then(() => {
            console.log("ok");
           
        })
        .catch((err) => {
            console.log("error:", err);
        });
        
     return;
    });
        
    

// Get Balance
    app.get('/api/balance/:privateKey/:CONTRACT/:address/:balance', function(req, res) {
        

        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.trongrid.io");
        // const fullNode = new HttpProvider("http://192.168.1.162:8090");
        const solidityNode = new HttpProvider("https://api.trongrid.io");
        const eventServer = new HttpProvider("https://api.trongrid.io");
        
        var privateKey = req.params.privateKey;
        var CONTRACT = req.params.CONTRACT;
        var address = req.params.address;
        
           
        
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
        
        
        async function main() {
            const {
                abi
            } = await tronWeb.trx.getContract(CONTRACT);
            // console.log(JSON.stringify(abi));
        
            const contract = tronWeb.contract(abi.entrys, CONTRACT);
        
            const balance = await contract.methods.balanceOf(address).call();
            console.log("balance:", balance.toString());
            res.json(balance)
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
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listen on port ${port}`))






