const Web3 = require('web3');

//const provider = new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'); // https://api.avax.network/ext/bc/C/rpc
const provider = new Web3.providers.HttpProvider('http://185.193.66.140:9650/ext/bc/C/rpc');

const web3 = new Web3(provider);

const contractABI = require('../constant/abi.json');

const contractAddress = process.env.CONTRACTADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function mintNFT(tokenId) {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const gas = await contract.methods
    .mint(tokenId)
    .estimateGas({ from: account });
  const receipt = await contract.methods
    .mint(tokenId)
    .send({ from: account, gas });
  console.log(receipt);
}

async function sendEther(recipient, amount) {
  console.log(recipient, amount);
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  const gasPrice = await web3.eth.getGasPrice();
  // const balance = await web3.eth.getBalance(sender);
  const amountToSend = web3.utils.toWei(String(amount), 'ether');
  const transaction = {
    from: sender,
    to: recipient,
    value: amountToSend,
    gasPrice,
    gas: 21000
  };
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
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const gas = await contract.methods
    .setTokenURI(tokenId, metadata)
    .estimateGas({ from: account });
  const receipt = await contract.methods
    .setTokenURI(tokenId, metadata)
    .send({ from: account, gas });
  console.log(receipt);
}

async function transferNFT(tokenId, recipient) {
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  const gas = await contract.methods
    .transferFrom(sender, recipient, tokenId)
    .estimateGas({ from: sender });
  const receipt = await contract.methods
    .transferFrom(sender, recipient, tokenId)
    .send({ from: sender, gas });
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
  mintNFT,
  updateMetadata,
  transferNFT,
  sendEther,
  getBalance
};
