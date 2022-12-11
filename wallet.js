const TronWeb = require('tronweb');

 

async function getBalance() {

    const privateKey = "02f81c350a49ff229366f08d7982ead3287118aece1a7a5f5bac07d3d07776bb" ;
    const address =  "TXgFrvnST2cK6Vp2fAu3rqnGnZ42iuaJKR";
    

    const trc20ContractAddress = CONTRACT;
    let url = "https://api.trongrid.io";
    
    const tronWeb = new TronWeb({
      fullHost: url,
      headers: headers,
      privateKey: privateKey,
    });
    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        const result = await contract.balanceOf(address).call();
        return result / 1000000;
    } catch(error) {
        console.log(error);
        return null;
    }
}