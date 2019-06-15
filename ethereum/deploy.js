const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledMeta = require('./build/MetaCenter.json');

//connecting to a node
//infura service: public API that give ability to access to node that hosted in rinkeby network by infura
const provider = new HDWalletProvider(
    'junior submit happy huge vanish pair live comfort shield polar message chapter', //account mnemonic=to get public key and private key
    'https://rinkeby.infura.io/v3/0b6dc3acaae64224bc5342cdf9e2ae9e'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledMeta.interface))
        .deploy({data: '0x' + compiledMeta.bytecode}) // add 0x bytecode
        .send({from: accounts[0]});
    
    console.log('Contract deployed to', result.options.address);
};
deploy();

//Contract deployed from account 0x8c9F7F6800D560fb729020bDaEd037997F008701
// First contract deployed to 0xED57c6a746EE8Ec1B9a0638ED5ce7687f766f9Df
//Contract v0 deployed to 0x4d9075ef5C1539eB00802Eb0f7BB3903fa9254d9
//Contract v1 deployed to 0xE0378f0C8141e3a8A0b738b38210C0B04794ae7D (using ABIEncoderV2)
//Contract v2 deployed to 0xA07987489bdBaC574d21eEB653fafbdFdf1288fd
//Contract v3 deployed to 0xF03272dC91F5996f4d7291edcE3b247E224AF023
//Contract v3 deployed to 0xA74fDe6a35aB88296569Df49C387340018a05217 (simplicity and more feature)
