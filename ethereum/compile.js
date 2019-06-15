const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); //file-system module to give access to file system in local computer

//delete entire 'build' folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

//read Meta.sol from 'contracts' folder
const metaPath = path.resolve(__dirname, 'contracts', 'Meta.sol');
const source = fs.readFileSync(metaPath, 'utf8');

//compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;

//write output to 'build' folder
fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(':', '') + '.json'),
		output[contract]
	);
}
