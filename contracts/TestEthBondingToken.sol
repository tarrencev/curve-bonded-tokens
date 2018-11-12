pragma solidity ^0.4.25;

import "./EthBondingToken.sol";

contract TestEthBondingToken is EthBondingToken {
  function initialize(uint256 _initialSupply, uint32 _reserveRatio, uint256 _gasPrice) initializer public payable {
    EthBondingToken.initialize(_initialSupply, _reserveRatio, _gasPrice);
  }

  /**
   * @dev default function
   */
  function() public payable {
    _curvedMint();
  }

  function mint() public payable {
    _curvedMint();
  }

  function burn(uint256 amount) public {
    _curvedBurn(amount);
  }
}
