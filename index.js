//const { createWallet} = require("./wallet");
const { PrivateKey } = require("bitcore-lib");
const Mnemonic = require("bitcore-mnemonic");
const TronWeb = require('tronweb');
//const hdWallet = require('tron-wallet-hd');
const Address =  require ('tron-address-mnemonic');
const CryptoAccount = require("send-crypto");
const multichainWallet = require('multichain-crypto-wallet');

const bodyPaser = require('body-parser');
const express = require('express');



const app = express();

app.use(express.json());
app.use(bodyPaser.urlencoded())
app.use(bodyPaser.json());

//https://github.com/iamnotstatic/multichain-crypto-wallet#native-coins
// https://www.npmjs.com/package/multichain-crypto-wallet
// Bitcoin  wallet setup 

// create BTC wallet
app.get('/api/multi/btcwallet', async (req, res)  => {
 
    const wallet = multichainWallet.createWallet({
        derivationPath: "", // Leave empty to use default derivation path
        network: 'bitcoin-testnet',
      });
    
      console.log(wallet)
      res.json(wallet);
      return;
});

// get BTC Balance
app.get('/api/multi/balance/:Address', async (req, res)  => {
    var Address = req.params.Address;
    // Get the BTC balance of an address.
    const data = await multichainWallet.getBalance({
    address:Address,
    //address: '2NAhbS79dEUeqcnbC27UppwnjoVSwET5bat',
    //address:'1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v',
    network: 'bitcoin-testnet', // 'bitcoin' or 'bitcoin-testnet'
  });
    
      console.log(data)
      res.json(data);
      return;
});


app.get('/api/multi/transferBtc/:PrivateKey/:Address/:Amount', async (req, res)  => {
    var privateKey = req.params.PrivateKey;
    var recipientAddress = req.params.Address;
    var amount = req.params.Amount;
     // Transferring BTC from one address to another.
    const response = await multichainWallet.transfer({

    //privateKey: 'L3tSvMViDit1GSp7mbV2xFCGv6M45kDNuSyNY9xyUxmUPBFrBkc4',
    //recipientAddress: 'mgPVEgijcmNTTzZFCa8pwpEmWbaTbA2ega',
    //amount: 0.003,
    privateKey: privateKey,
    recipientAddress: recipientAddress,
    amount: amount,
    network: 'bitcoin-testnet', // 'bitcoin' or 'bitcoin-testnet'
    fee: 10000, // Optional param default value is 10000
    subtractFee: false // Optional param default value is false
  });
      console.log(response)
      res.json(response);
      return;
});


// Ethereum wallet setup 

app.get('/api/multi/ethwallet', async (req, res)  => {
 
    const wallet = multichainWallet.createWallet({
        derivationPath: "", // Leave empty to use default derivation path
        network: 'ethereum',
      });
    
      console.log(wallet)
      res.json(wallet);
      return;
});

// get ETH Balance
app.get('/api/multi/ethBalance/:Address', async (req, res)  => {
    var Address = req.params.Address;

// Get the ETH balance of an address.
const ethdata = await multichainWallet.getBalance({
    //address: '0x2455eC6700092991Ce0782365A89d5Cd89c8Fa22',
    address: Address,
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
  }); // NOTE - For otherEVM compatible blockchains all you have to do is change the rpcUrl.
  
      console.log(ethdata)
      res.json(ethdata);
      return;
});


app.get('/api/multi/transferEth/:PrivateKey/:Address/:Amount', async (req, res)  => {
    var privateKey = req.params.PrivateKey;
    var recipientAddress = req.params.Address;
    var amount = req.params.Amount;
     // Transferring ETH from one address to another.
const transfer = await multichainWallet.transfer({
    recipientAddress:recipientAddress,// '0x9e2eC09b4729d840C53775eEa06aEC0883770b74',
    amount: amount, // 0.001,
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    privateKey: privateKey,
      //'0f9e5c0bee6c7d06b95204ca22dea8d7f89bb04e8527a2c59e134d185d9af8ad',
    gasPrice: '10', // Gas price is in Gwei. Leave empty to use default gas price
    data: 'Money for transportation', // Send a message
  }); // NOTE - For other EVM compatible blockchains all you have to do is change the rpcUrl.
  
      console.log(transfer)
      res.json(transfer);
      return;
});




// get USDC ERC20 Balance
app.get('/api/multi/usdcBalance/:Address', async (req, res)  => {
    var Address = req.params.Address;

// Get the balance of an ERC20 token.
const data = await multichainWallet.getBalance({
    address: Address, // '0x2455eC6700092991Ce0782365A89d5Cd89c8Fa22',
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth',
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  }); // NOTE - For other EVM compatible blockchains all you have to do is change the rpcUrl.
  
      console.log(data)
      res.json(data);
      return;
});

// Transferring ERC20 tokens(USDC) from one address to another.
app.get('/api/multi/transferUsdc/:PrivateKey/:Address/:Amount', async (req, res)  => {
    var privateKey = req.params.PrivateKey;
    var recipientAddress = req.params.Address;
    var amount = req.params.Amount;
     
    // Transferring ERC20 tokens(USDC) from one address to another.
const transfer = await multichainWallet.transfer({
    recipientAddress:recipientAddress, //'0x2455eC6700092991Ce0782365A89d5Cd89c8Fa22',
    amount: amount, // 10,
    network: 'ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth',
    privateKey: privateKey,
      //'0f9e5c0bee6c7d06b95204ca22dea8d7f89bb04e8527a2c59e134d185d9af8ad',
    gasPrice: '10', // Gas price is in Gwei. leave empty to use default gas price
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  }); // NOTE - For other EVM compatible blockchains all you have to do is change the rpcUrl.

      console.log(transfer)
      res.json(transfer);
      return;
});




// get Address tronweb
app.get('/api/mtronweb', (req, res) => {
    const RandomAccount = TronWeb.createRandom()
    
    res.json(RandomAccount);
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



//PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listen on port ${port}`))






