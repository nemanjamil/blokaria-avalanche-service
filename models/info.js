// import mongoose, {Schema} from 'mongoose';
const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema(
  {
    publicKey: {
      type: String
    },
    privateKey: {
      type: String
    },
    network: {
      type: String
    },
    balance: {
      type: Number
    }
  },
  { timestamps: true }
);

const Wallet = mongoose.model('Wallet', WalletSchema);

exports.WalletDB = Wallet;
