pragma solidity ^0.4.24;

import "./BondingCurve.sol";

/**
 * @title Eth Bonding Curve
 * @dev Eth backed Bonding curve contract
 */
contract EthBondingCurve is BondingCurve {
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
   * @param amount Amount of tokens to withdraw
   */
  function burn(uint256 amount) public {
    uint256 returnAmount = _curvedBurn(amount);
    msg.sender.transfer(returnAmount);
  }
}
