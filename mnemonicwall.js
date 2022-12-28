const multichainWallet = require('multichain-crypto-wallet');
// Generate an Ethereum wallet from mnemonic.
const wallet = multichainWallet.generateWalletFromMnemonic({
    mnemonic:
      'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
    derivationPath: "", // Leave empty to use default derivation path
    network: 'ethereum',
  });