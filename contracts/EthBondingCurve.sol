pragma solidity ^0.4.24;

import "./BondingCurve.sol";
import "zos-lib/contracts/Initializable.sol";

/**
 * @title Eth Bonding Curve
 * @dev Eth backed Bonding curve contract
 */
contract EthBondingCurve is Initializable, BondingCurve {

  function initialize(uint256 _gasPrice) initializer public {
    BondingCurve.initialize(_gasPrice);
  }

  /**
   * @dev default function
   */
  function() public payable {
    mint();
  }

  /**
   * @dev Mint tokens
   */
  function mint() public payable {
    require(msg.value > 0);
    _curvedMint(msg.value);
  }

  /**
   * @dev Burn tokens
   *
   * @param amount Amount of tokens to burn
   */
  function burn(uint256 amount) public {
    uint256 returnAmount = _curvedBurn(amount);
    msg.sender.transfer(returnAmount);
  }
}
