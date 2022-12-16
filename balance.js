// USDT Balance

app.get('/api/balance/:privateKey/:CONTRACT/:address', function(req, res) {
        

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    // const fullNode = new HttpProvider("http://192.168.1.162:8090");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    
    var privateKey = req.params.privateKey;
    var CONTRACT = req.params.CONTRACT;
    var address = req.params.address
    
       
       const transfer = [
        {CONTRACT:CONTRACT},
        {privateKey:privateKey},
        {address:address},
    ]
    res.send(transfer);
    
    
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
    