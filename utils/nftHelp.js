const Web3 = require('web3');
const { Contract } = require('web3-eth-contract')

const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc');
// const provider = new Web3.providers.HttpProvider('https://api.avax-test.network/ext/bc/C/rpc');
// https://api.avax.network/ext/bc/C/rpc        - prod
// https://api.avax-test.network/ext/bc/C/rpc   - test 
// const provider = new Web3.providers.HttpProvider('http://185.193.66.140:9650/ext/bc/C/rpc');  - my server test

// const web3 = new Web3(provider);

const contractABI = require('../constant/abi.json');

const contractAddress = process.env.CONTRACTADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function mintNFT(tokenId) {
  const sender = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATEKEY);

  const gas = await contract.methods
    .setMarketPlaceAddress('0xa9C19FCE5CfB91F9B73756781F8Aa0285c001234')
    .estimateGas({ from: sender.address }); // sorry, lost connect
  const receipt = await contract.methods
    .setMarketPlaceAddress('0xa9C19FCE5CfB91F9B73756781F8Aa0285c001234')
    .send({ from: sender.address, gas });
  console.log(receipt);
}

async function sendEther(recipient, amount) {
  console.log(recipient, amount);
  const accounts = await web3.eth.getAccounts();
  //const sender = accounts[0];

  console.log(process.env.PRIVATEKEY)
  const sender = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATEKEY); // I meant this. okay? 
  const gasPrice = await web3.eth.getGasPrice();
  // const balance = await web3.eth.getBalance(sender);  // let me check more. seems it's not thing to finish here shortly.
  // ok. sorry no prb :) I undersund .. Someware is minor bug...., yeah, so work flow is like this. Let me check more and fix. Good night. :) :) Thx :) 
  const amountToSend = web3.utils.toWei(String(amount), 'ether');

  console.log('sendEther sender', sender);

  const transaction = {
    from: sender.address,  // no data here
    to: recipient,
    value: amountToSend,
    gasPrice,
    gas: 21000
  };

  console.log('sendEther transaction', transaction);

  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    process.env.PRIVATEKEY
  );
  const receipt = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  console.log(receipt);
}

async function updateMetadata(tokenId, metadata) {
  const sender = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATEKEY);
  const gas = await contract.methods
    .setTokenURI(tokenId, metadata)
    .estimateGas({ from: sender.address });
  const receipt = await contract.methods
    .setTokenURI(tokenId, metadata)
    .send({ from: sender.address, gas });
  console.log(receipt);
}

async function transferNFT(tokenId, recipient) {
  const sender = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATEKEY);
  const gas = await contract.methods
    .transferFrom(sender.address, recipient, tokenId)
    .estimateGas({ from: sender.address });
  const receipt = await contract.methods
    .transferFrom(sender.address, recipient, tokenId)
    .send({ from: sender.address, gas });
  console.log(receipt);
}

async function getBalance(req, res) {
  try {
    const { address } = req.params;
    const balance = await web3.eth.getBalance(address);
    res.status(200).json({ balance });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  mintNFT,  // ?
  updateMetadata, // ?
  transferNFT, // ?
  sendEther, // works
  getBalance  // works
};


// something went wrong. seems web3 version issue. 