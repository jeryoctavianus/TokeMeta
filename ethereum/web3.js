import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	//user is in the browser and metamask is running
	window.web3.currentProvider.enable();
	web3 = new Web3(window.web3.currentProvider);
} else {
	//user is on the browser and metamask is not running
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/v3/0b6dc3acaae64224bc5342cdf9e2ae9e'
	);
	web3 = new Web3(provider);
}

export default web3;
