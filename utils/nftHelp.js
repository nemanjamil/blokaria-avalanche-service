const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
// https://api.avax.network/ext/bc/C/rpc        - prod
// https://api.avax-test.network/ext/bc/C/rpc   - test 
// const provider = new Web3.providers.HttpProvider('http://185.193.66.140:9650/ext/bc/C/rpc');  - my server test

const web3 = new Web3(provider);

const contractABI = require('../constant/Blokariacontract.json');

const contractAddress = process.env.CONTRACTADDRESS;
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

async function mintNFT(tokenId) {
  const accounts = await web3.eth.getAccounts();

  // no accounts in the lsit
  console.log('accounts', accounts);

  const account = accounts[0];
  const sender = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATEKEY);

  console.log('account', account);

  const gas = await contract.methods
    .mint(tokenId)
    .estimateGas({ from: sender.address }); // sorry, lost connect
  const receipt = await contract.methods
    .mint(tokenId)
    .send({ from: sender.address, gas });
  console.log(receipt);
}

async function sendEther(recipient, amount) {

  try {
    console.log("1. sendEther recipient", recipient);
    console.log("2. sendEther amount", amount);
    //const accounts = await web3.eth.getAccounts();
    //const sender = accounts[0];

    console.log("3. sendEther process.env.PRIVATEKEY", process.env.PRIVATEKEY)
    const sender = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATEKEY);
    const gasPrice = await web3.eth.getGasPrice();
    // const balance = await web3.eth.getBalance(sender);

    console.log('4. sendEther gasPrice', gasPrice);

    const amountToSend = web3.utils.toWei(String(amount), 'ether');

    console.log('5. sendEther amountToSend', amountToSend);

    const transaction = {
      from: sender.address,  // no data here
      to: recipient,
      value: amountToSend,
      gasPrice,
      gas: 521000
    };

    console.log('6. sendEther transaction', transaction);

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      process.env.PRIVATEKEY
    );

    console.log('7. sendEther signedTransaction', signedTransaction);

    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    console.log('8. sendEther receipt', receipt);

    return { transaction, receipt }

  } catch (error) {
    console.error('0. sendEther error', error);
    throw new Error(error.message);
  }



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
