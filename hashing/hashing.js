"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line)
}


// Create a function called createBlock()
// `index`
// `prevHash`
// `data`
// `timestamp`
// `hash`

function createBlock(_data) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: _data,
		timestamp: Date.now()
	}
	block.hash = blockHash(block)
	Blockchain.blocks.push(block)

	console.log(block)
	return block
}

// Create a function called verifyChain()
// for that create a function called verifyBlock()
function verifyBlock(block) {
	if (block.data == "" || block.prevHash == "") {
		console.log("No Blog data or No prevHash")
		return false;
	}
	else if (!Number.isInteger(block.index) && !block.index >= 0) {
		console.log("Block index is not Valid")
		return false;
	}
	else if (!block.hash == blockHash(block)) {
		console.log("Blog Hash is Not Valid")
		return false;
	}
	else if (Blockchain.blocks[0].hash !== "000000") {
		console.log("Genesis Block is not valid")
		return false
	}
	return true;
}

function verifyChain(Blockchain) {
	for (let i =1; i < Blockchain.blocks.length; i++) {
		if (!verifyBlock(Blockchain.blocks[i])) {
			console.log("Blockchain is Not Valid")
			return false
		}
		if (Blockchain.blocks[i].prevHash !== Blockchain.blocks[i-1].hash) {
			console.log("Blockchain is not Valid (Hash)")
			return false
		}
	}
	return true
}


console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	// let block = JSON.stringify(bl)
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp}`
		// block
	).digest("hex");
}
