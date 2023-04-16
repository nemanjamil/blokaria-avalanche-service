const Storage = artifacts.require("Blokariacontract")

module.exports = function (deployer) {
    deployer.deploy(Storage)
}