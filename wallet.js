const Address =  require ('tron-address-mnemonic');
const mnemonic = Address.generateMnemonic();
//console.log(mnemonic);

const address = new Address(mnemonic, 0);
//console.log(address.master);
console.log(address.masterInfo);
//console.log(address.createAddress())