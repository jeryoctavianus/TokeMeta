import web3 from './web3';
import Meta from './build/Meta.json';

export default address => {
	return new web3.eth.Contract(JSON.parse(Meta.interface), address);
};
