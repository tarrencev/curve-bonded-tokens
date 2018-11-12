pragma solidity ^0.4.25;

import "./ERC20BondingToken.sol";

contract TestERC20BondingToken is ERC20BondingToken {
  function initialize(ERC20 _reserveToken, uint256 _initialPoolBalance, uint256 _initialSupply, uint32 _reserveRatio, uint256 _gasPrice) initializer public {
    ERC20BondingToken.initialize(_reserveToken, _initialPoolBalance, _initialSupply, _reserveRatio, _gasPrice);
  }

  function mint(uint256 amount) public {
    _curvedMint(amount);
  }

  function burn(uint256 amount) public {
    _curvedBurn(amount);
  }
}
