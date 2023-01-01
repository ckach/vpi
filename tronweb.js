const TronWeb = require('tronweb');
const hdWallet = require('tron-hd-wallet');

//const Account = TronWeb.createAccount()

//const RandomAccount = TronWeb.createRandom()

//const valid = TronWeb.isAddress("THEGR4Aor5pCDVktbbbwgHAE6PQWRfejBf")

const seed = "life shoe corn hurdle notice urge cabbage world minor flip retreat detect";
const account = hdWallet.getAccountAtIndex(seed,1);

console.log(account);