// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Blokariacontract {

    address public  owner;
    constructor () {
        owner = msg.sender;
    }
    // receive Function to receive ETH
    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getBalanceRequster(address _address) public pure returns (address) {
        return _address;
    }

    function sendEther() public payable {
        uint x;
        x++;
    }
    function tranferEther(address payable _recepinet, uint _amount) public returns (bool) {
        require(owner == msg.sender, "You are not the owner!");
        
        if (_amount <= getBalance()) {
            _recepinet.transfer(_amount);
            return  true;
        } else {
            return  false;
        }
    }
}
