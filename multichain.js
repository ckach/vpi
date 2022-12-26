const multichainWallet = require('multichain-crypto-wallet');


const wallet = multichainWallet.createWallet({
    derivationPath: "", // Leave empty to use default derivation path
    network: 'bitcoin',
  });

  console.log(wallet)

  // Get the ETH balance of an address.
const data = await multichainWallet.getBalance({
    address: '0x2455eC6700092991Ce0782365A89d5Cd89c8Fa22',
    network: 'ethereum',
    rpcUrl: 'https://rinkeby-light.eth.linkpool.io',
  });  // NOTE - For otherEVM compatible blockchains all you have to do is change the rpcUrl.
  console.log(data)