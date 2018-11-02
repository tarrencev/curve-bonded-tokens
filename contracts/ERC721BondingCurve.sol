pragma solidity ^0.4.24;

import "openzeppelin-eth/contracts/token/ERC721/ERC721.sol";

import "./BondingCurve.sol";

/**
 * @title Token Bonding Curve
 * @dev Token backed Bonding curve contract
 */
contract ERC721BondingCurve is BondingCurve {
  /* Reserve Token */
  ERC721 public reserveToken;

  /**
   * @dev Mint tokens
   *
   * @param amount Amount of tokens to deposit
   */
  function mint(uint256 tokenId) public {
    require(reserveToken.transferFrom(msg.sender, this, tokenId));
    _curvedMint(1);
  }
}
