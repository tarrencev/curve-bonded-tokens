pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./BancorFormula.sol";

/**
 * @title Bonding Curve
 * @dev Bonding curve contract based on Bacor formula
 * inspired by bancor protocol and simondlr
 * https://github.com/bancorprotocol/contracts
 * https://github.com/ConsenSys/curationmarkets/blob/master/CurationMarkets.sol
 */
contract EthBondingCurve is ERC20, BancorFormula, Ownable {
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

  event LogCurvedMint(address sender, uint256 amountMinted, uint256 totalCost);
  event LogCurvedBurn(address sender, uint256 amountWithdrawn, uint256 returnAmount);

  /**
   * @dev Buy tokens
   * gas ~ 77825
   * TODO implement maxAmount that helps prevent miner front-running
   */
  function _curvedMint(uint256 reserveAmount) validGasPrice internal returns (uint256) {
    uint256 tokensToMint = calculatePurchaseReturn(totalSupply(), poolBalance, reserveRatio, reserveAmount);
    _mint(msg.sender, tokensToMint);
    poolBalance = poolBalance.add(reserveAmount);
    emit LogCurvedMint(msg.sender, tokensToMint, reserveAmount);
  }

  function calculateCurvedMintReturn(uint256 amount) public view returns (uint256) {
    return calculatePurchaseReturn(totalSupply(), poolBalance, reserveRatio, amount);
  }

  /**
   * @dev Sell tokens
   * gas ~ 86936
   * @param amount Amount of tokens to withdraw
   * TODO implement maxAmount that helps prevent miner front-running
   */
  function _curvedBurn(uint256 burnAmount) validGasPrice internal returns (uint256) {
    require(burnAmount > 0 && balanceOf(msg.sender) >= burnAmount);
    uint256 returnAmount = calculateSaleReturn(totalSupply(), poolBalance, reserveRatio, burnAmount);
    poolBalance = poolBalance.sub(returnAmount);
    _burn(msg.sender, burnAmount);
    emit LogCurvedBurn(msg.sender, burnAmount, returnAmount);
    return returnAmount;
  }

  function calculateBurnReturn(uint256 burnAmount) public view returns (uint256) {
    return calculateSaleReturn(totalSupply(), poolBalance, reserveRatio, burnAmount);
  }

  // verifies that the gas price is lower than the universal limit
  modifier validGasPrice() {
    assert(tx.gasprice <= gasPrice);
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
