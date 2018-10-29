pragma solidity ^0.4.24;

import "openzeppelin-eth/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "./BancorFormula.sol";

/**
 * @title Bonding Curve
 * @dev Bonding curve contract based on Bacor formula
 * inspired by bancor protocol and simondlr
 * https://github.com/bancorprotocol/contracts
 * https://github.com/ConsenSys/curationmarkets/blob/master/CurationMarkets.sol
 */
contract BondingCurve is ERC20, BancorFormula, Ownable {
  uint256 public poolBalance;

  /*
    reserve ratio, represented in ppm, 1-1000000
    1/3 corresponds to y= multiple * x^2
    1/2 corresponds to y= multiple * x
    2/3 corresponds to y= multiple * x^1/2
    multiple will depends on contract initialization,
    specificallytotalAmount and poolBalance parameters
    we might want to add an 'initialize' function that will allow
    the owner to send ether to the contract and mint a given amount of tokens
  */
  uint32 public reserveRatio;

  /*
    - Front-running attacks are currently mitigated by the following mechanisms:
    TODO - minimum return argument for each conversion provides a way to define a minimum/maximum price for the transaction
    - gas price limit prevents users from having control over the order of execution
  */
  uint256 public gasPrice = 0 wei; // maximum gas price for bancor transactions

  event CurvedMint(address sender, uint256 amount, uint256 deposit);
  event CurvedBurn(address sender, uint256 amount, uint256 reimbursement);

  function calculateCurvedMintReturn(uint256 amount) public view returns (uint256) {
    return calculatePurchaseReturn(totalSupply(), poolBalance, reserveRatio, amount);
  }

  function calculateCurvedBurnReturn(uint256 amount) public view returns (uint256) {
    return calculateSaleReturn(totalSupply(), poolBalance, reserveRatio, amount);
  }

  /**
   * @dev Mint tokens
   */
  function _curvedMint(uint256 deposit) validGasPrice validMint(deposit) internal returns (uint256) {
    uint256 amount = calculateCurvedMintReturn(deposit);
    _mint(msg.sender, amount);
    poolBalance = poolBalance.add(deposit);
    emit CurvedMint(msg.sender, amount, deposit);
    return amount;
  }

  /**
   * @dev Burn tokens
   * @param amount Amount of tokens to withdraw
   */
  function _curvedBurn(uint256 amount) validGasPrice validBurn(amount) internal returns (uint256) {
    uint256 reimbursement = calculateCurvedBurnReturn(amount);
    poolBalance = poolBalance.sub(reimbursement);
    _burn(msg.sender, amount);
    emit CurvedBurn(msg.sender, amount, reimbursement);
    return reimbursement;
  }

  // verifies that the gas price is lower than the universal limit
  modifier validGasPrice() {
    assert(tx.gasprice <= gasPrice);
    _;
  }

  modifier validBurn(uint256 amount) {
    require(amount > 0 && balanceOf(msg.sender) >= amount);
    _;
  }

  modifier validMint(uint256 amount) {
    require(amount > 0);
    _;
  }

  /**
    @dev Allows the owner to update the gas price limit
    @param _gasPrice The new gas price limit
  */
  function setGasPrice(uint256 _gasPrice) onlyOwner public {
    require(_gasPrice > 0);
    gasPrice = _gasPrice;
  }
}
