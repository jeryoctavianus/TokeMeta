import web3 from './web3';
import MetaCenter from './build/MetaCenter.json';

const instance = new web3.eth.Contract(
	JSON.parse(MetaCenter.interface),
	'0xA74fDe6a35aB88296569Df49C387340018a05217' //change to deployed address
);

export default instance;
