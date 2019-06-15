const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCenter = require('../ethereum/build/MetaCenter.json');
const compiledMeta = require('../ethereum/build/Meta.json');

let accounts;
let center;
let metaAddress;
let meta;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	
	center = await new web3.eth.Contract(JSON.parse(compiledCenter.interface))
		.deploy({data: compiledCenter.bytecode})
		.send({from: accounts[0], gas: '2000000'});
		
	await center.methods.createMeta('Virza', 'Rindu', 'Rindu telah pergi, mentari tak bersinar lagi', 'Guarantee min=1 ether').send({
		from: accounts[0],
		gas: '2000000'
	});
	
	[metaAddress] = await center.methods.getDeployedMeta().call();
	meta = await new web3.eth.Contract(
		JSON.parse(compiledMeta.interface),
		metaAddress
	);
});

describe('TokeMeta Unit Testing', () => {
	it('deploys a MetaCenter and a Metadata', () => {
		assert.ok(center.options.address);
		assert.ok(meta.options.address);
	});
	
	it('marks caller as the metadata manager', async () => {
		const manager = await meta.methods.manager().call();
		assert.equal(accounts[0], manager);
	});
	
	it('allows people to donate money', async () => {
		await meta.methods.donate(300).send({
			value: '300',
			from: accounts[1],
			gas: '2000000'
		});
		const isDonator = await meta.methods.donators(accounts[1]).call();
		assert(isDonator);
	});
	
	it('allows manager or other user to make a metadata enrichment', async () => {
		await meta.methods
			.createRequest('lagu dinyanyikan di acara kampus')
			.send({
				from: accounts[1],
				gas: '1000000'
			});
		const request = await meta.methods.requests(0).call();
		
		assert.equal('lagu dinyanyikan di acara kampus', request.description)
	});
});
