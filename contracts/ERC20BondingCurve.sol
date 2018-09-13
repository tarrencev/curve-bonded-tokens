pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import "./BondingCurve.sol";

/**
 * @title Token Bonding Curve
 * @dev Token backed Bonding curve contract
 */
contract ERC20BondingCurve is BondingCurve {

  /* Reserve Token */
  ERC20 public reserveToken;

  /**
   * @dev Mint tokens
   *
   * @param amount Amount of tokens to deposit
   */
  function mint(uint256 amount) public {
    require(reserveToken.transferFrom(msg.sender, this, amount));
    _curvedMint(amount);
  }

  /**
   * @dev Burn tokens
   *
   * @param amount Amount of tokens to burn
   */
  function burn(uint256 amount) public {
    uint256 reimbursement = _curvedBurn(amount);
    reserveToken.transfer(msg.sender, reimbursement);
  }
}
