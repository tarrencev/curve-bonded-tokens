pragma solidity ^0.4.24;

import "openzeppelin-eth/contracts/token/ERC20/ERC20.sol";
import "zos-lib/contracts/Initializable.sol";

import "./BondingCurveToken.sol";

/**
 * @title Token Bonding Curve
 * @dev Token backed Bonding curve contract
 */
contract ERC20BondingToken is Initializable, BondingCurveToken {

  /* Reserve Token */
  ERC20 public reserveToken;

  function initialize(ERC20 _reserveToken, uint256 _initialPoolBalance, uint256 _initialSupply, uint32 _reserveRatio, uint256 _gasPrice) initializer public {
    reserveToken = _reserveToken;
    require(reserveToken.transferFrom(msg.sender, this, _initialPoolBalance), "ERC20BondingToken: Failed to transfer tokens for intial pool.");
    BondingCurveToken.initialize(_initialSupply, _reserveRatio, _gasPrice);
  }

  /**
   * @dev Mint tokens
   *
   * @param amount Amount of tokens to deposit
   */
  function _curvedMint(uint256 amount) internal returns (uint256) {
    require(reserveToken.transferFrom(msg.sender, this, amount));
    super._curvedMint(amount);
  }

  /**
   * @dev Burn tokens
   *
   * @param amount Amount of tokens to burn
   */
  function _curvedBurn(uint256 amount) internal returns (uint256) {
    uint256 reimbursement = super._curvedBurn(amount);
    reserveToken.transfer(msg.sender, reimbursement);
  }

  function poolBalance() public view returns(uint256) {
    return reserveToken.balanceOf(this);
  }
}
