pragma solidity ^0.4.24;

import "./BondingCurveToken.sol";
import "zos-lib/contracts/Initializable.sol";

/**
 * @title Eth Bonding Curve
 * @dev Eth backed Bonding curve contract
 */
contract EthBondingToken is Initializable, BondingCurveToken {
  uint256 public poolBalance_;

  function initialize(uint256 _initialSupply, uint32 _reserveRatio, uint256 _gasPrice) initializer public payable {
    poolBalance_ = msg.value;
    BondingCurveToken.initialize(_initialSupply, _reserveRatio, _gasPrice);
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
    poolBalance_ = poolBalance_.add(msg.value);
  }

  /**
   * @dev Burn tokens
   *
   * @param amount Amount of tokens to burn
   */
  function burn(uint256 amount) public {
    uint256 returnAmount = _curvedBurn(amount);
    poolBalance_ = poolBalance_.sub(returnAmount);
    msg.sender.transfer(returnAmount);
  }

  function poolBalance() public view returns(uint256) {
    return poolBalance_;
  }
}
