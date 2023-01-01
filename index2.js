//const { createWallet} = require("./wallet");
const { PrivateKey } = require("bitcore-lib");
const Mnemonic = require("bitcore-mnemonic");

//const hdWallet = require('tron-wallet-hd');
const Address =  require ('tron-address-mnemonic');
const multichainWallet = require('multichain-crypto-wallet');
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

// get USDT Address and Pk from mnemonic
app.get('/api/usdtwalletmn/:Mnemonic', (req, res) => {

   var mnemonic = req.params.Mnemonic;
   const wallet = TronWeb.fromMnemonic(mnemonic)
  
    //console.log(wallet);
    res.json(wallet);
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


 // Get Tron Balance

 app.get('/api/usdtbalance/:privateKey/:CONTRACT/:Address', function(req, res) {

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    // const fullNode = new HttpProvider("http://192.168.1.162:8090");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");

    var privateKey = req.params.privateKey;
    var address = req.params.Address;
    var CONTRACT = req.params.CONTRACT;
    

    //const CONTRACT=  "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    //const privateKey="e9bc7a332407d323e13b8c1272c103d8a676b749ba42ccc25f1eb915087cac59"
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    //const address = "TDrNh6PJvVHZmJSEc3nSTCvXHLN3V4Q5KT";
    
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


 // Get Tron USDC Balance

 app.get('/api/usdctronbalance/:privateKey/:CONTRACT/:Address', function(req, res) {

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    // const fullNode = new HttpProvider("http://192.168.1.162:8090");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");

    var privateKey = req.params.privateKey;
    var address = req.params.Address;
    var CONTRACT = req.params.CONTRACT;
    

    //const CONTRACT=  "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8";
    //const privateKey="e9bc7a332407d323e13b8c1272c103d8a676b749ba42ccc25f1eb915087cac59"
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    //const address = "TDrNh6PJvVHZmJSEc3nSTCvXHLN3V4Q5KT";
    
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






// create BTC wallet
app.get('/api/multi/btcwallet', async (req, res)  => {
 
    const wallet = multichainWallet.createWallet({
        derivationPath: "", // 
        network: 'bitcoin',
      });
    
      console.log(wallet)
      res.json(wallet);
      return;
});

// Generate an Bitcoin wallet from mnemonic.
app.get('/api/multi/btcwalletmn/:Mnemonic', async (req, res)  => {
 
    var mnemonic = req.params.Mnemonic;
      const wallet = multichainWallet.generateWalletFromMnemonic({
    mnemonic: mnemonic,
    derivationPath: "", 
    network: 'bitcoin-testnet',
  });
    
      //console.log(wallet)
      res.json(wallet);
      return;
});

// get BTC Balance
app.get('/api/multi/balance/:Address', async (req, res)  => {
    var Address = req.params.Address;
    const data = await multichainWallet.getBalance({
    address:Address,
    
    network: 'bitcoin-testnet', 
  });
    
     // console.log(data)
      res.json(data);
      return;
});

 // Transferring BTC from one address to another.
app.get('/api/multi/sendbtc/:PrivateKey/:Address/:Amount', async (req, res)  => {
    var privateKey = req.params.PrivateKey;
    var recipientAddress = req.params.Address;
    var amount = req.params.Amount;

    const response = await multichainWallet.transfer({

     privateKey: privateKey,
     recipientAddress: recipientAddress,
     amount: amount,
    network: 'bitcoin-testnet', 
    fee: 10000, 
    subtractFee: false // Optional param default value is false
  });
      //console.log(response)
      res.json(response);
      return;
});


// Ethereum wallet setup 

app.get('/api/multi/ethwallet', async (req, res)  => {
 
    const wallet = multichainWallet.createWallet({
        derivationPath: "", 
        network: 'ethereum',
      });
    
      //console.log(wallet)
      res.json(wallet);
      return;
});

// Generate an Ethereum wallet from mnemonic.
app.get('/api/multi/ethwalletmn/:Mnemonic', async (req, res)  => {
 
    var mnemonic = req.params.Mnemonic;
    
      const wallet = multichainWallet.generateWalletFromMnemonic({
    mnemonic: mnemonic,
    derivationPath: "", 
    network: 'ethereum',
  });
    
     // console.log(wallet)
      res.json(wallet);
      return;
});



// get ETH Balance
app.get('/api/multi/ethBalance/:Address', async (req, res)  => {
    var Address = req.params.Address;

// Get the ETH balance of an address.
const ethdata = await multichainWallet.getBalance({
    address: Address,
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
  }); 
  
      //console.log(ethdata)
      res.json(ethdata);
      return;
});


app.get('/api/multi/sendeth/:PrivateKey/:Address/:Amount/:gasPrice', async (req, res)  => {
    var privateKey = req.params.PrivateKey;
    var recipientAddress = req.params.Address;
    var amount = req.params.Amount;
    var gasPrice = req.params.gasPrice;
     
const transfer = await multichainWallet.transfer({
   
    recipientAddress:recipientAddress,
    amount: amount, 
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    privateKey: privateKey,
    gasPrice: gasPrice, 
    data: 'Money for transportation', 
  }); 
      //console.log(transfer)
      res.json(transfer);
      return;
});




// get USDC ERC20 Balance
app.get('/api/multi/usdcBalance/:Address', async (req, res)  => {
    var Address = req.params.Address;

// Get the balance of an ERC20 token.
const data = await multichainWallet.getBalance({
    address: Address, 
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth',
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  }); 
      //console.log(data)
      res.json(data);
      return;
});

// Transferring ERC20 tokens(USDC) from one address to another.
app.get('/api/multi/sendusdc/:PrivateKey/:Address/:Amount/:GasPrice', async (req, res)  => {
    var privateKey = req.params.PrivateKey;
    var recipientAddress = req.params.Address;
    var amount = req.params.Amount;
    var gasPrice = req.params.GasPrice;
     
    // Transferring ERC20 tokens(USDC) from one address to another.
const transfer = await multichainWallet.transfer({
    recipientAddress:recipientAddress, 
    amount: amount, 
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth',
    privateKey: privateKey,
      
    gasPrice: gasPrice, 
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  }); 
      //console.log(transfer)
      res.json(transfer);
      return;
});



// Error
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status(404);
    next(error);
})

app.use((error,req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
    
});




//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`))






