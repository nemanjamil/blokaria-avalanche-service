/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
const Web3 = require('web3');
const Wallet = require('ethereumjs-wallet');
const { WalletDB } = require('../models/info');

const rpcUrls = [
  'https://eth-mainnet.g.alchemy.com/v2/GAG2amJoAjnroZO0qYTLJXRbyO1PZnrg',
  'https://polygon-mainnet.g.alchemy.com/v2/ihQO7rPCU41VnIKaQAb6PhuAC2KiyLnD',
  'https://bsc-dataseed1.binance.org:443',
  'https://api.avax.network/ext/bc/C/rpc',
  'https://rpc-mainnet.kcc.network'
];

const networks = ['ETH', 'POLY', 'BSC', 'AVAX', 'KCC'];

// const provider = new Web3.providers.WebsocketProvider(rpcUrls[0], options);

// const tokens = ['0x2170ed0880ac9a755fd29b2688956bd959f933f8'];

const generateWallet = async (req, res) => {
  try {
    const EthWallet = Wallet.default.generate();
    const address = EthWallet.getAddressString();
    const privateKey = EthWallet.getPrivateKeyString();
    console.log(address, privateKey);
    res.status(200).json({
      address,
      privateKey
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateWallet };
