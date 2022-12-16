const TronWeb = require('tronweb');


const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = 'https://api.trongrid.io';
const privateKey = '02f81c350a49ff229366f08d7982ead3287118aece1a7a5f5bac07d3d07776bb';

// Create tronWeb object defining Node addresses
const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey,
);

// Create param object that defines all the API input parameters
const param = {
  exchangeID:5,          //Exchange ID Number
  tokenName:"_",         //Token name for TRX
  sold:1000000,        //TRX amount sold. Must be in SUN denomination.
  expected:1,            //Assigned as 1 to keep wide limit, like market order
  privKey:'02f81c350a49ff229366f08d7982ead3287118aece1a7a5f5bac07d3d07776bb',
}

async function trade(param){
  try {
    // Performs the trade between Token and TRX
    const tradeobj = await tronWeb.transactionBuilder.tradeExchangeTokens(exchangeID = param.exchangeID,
    tokenName = param.tokenName,
    tokenAmountSold = param.sold,
    tokenAmountExpected = param.expected,
    ownerAddress = "TXgFrvnST2cK6Vp2fAu3rqnGnZ42iuaJKR");

    // Signing the transaction
    const signedtxn = await tronWeb.trx.sign(tradeobj, param.privKey);

    // Broadcasting the transaction
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log(receipt)
  }
  catch(err) {
    console.log(err);
  };
};

trade(param); // Execute the function

//const account = TronWeb.fromMnemonic( 'fan radio tooth brush donate strong weapon shallow march try laugh cabin')
//const account = TronWeb.createRandom()
//console.log(tt)