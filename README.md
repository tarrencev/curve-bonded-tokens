# curve-bonded-tokens

Curve Bonded tokens based on the Bancor Formula and OpenZeppelin contracts

### Install

`npm install curve-bonded-tokens`

### Usage

Eth-backed curve bonded token:

```
pragma solidity ^0.4.24;

import "curve-bonded-tokens/contracts/EthBondingCurve.sol";

contract Token is EthBondingCurve {
  uint256 public constant INITIAL_SUPPLY = 2000000 * (10 ** 18);
  uint256 public constant INITIAL_PRICE = 39 * (10 ** 13);
  uint32 public constant CURVE_RATIO = 150000;
  uint256 public constant INITAL_BALANCE = CURVE_RATIO * INITIAL_SUPPLY * INITIAL_PRICE / (1000000 * 10 ** 18);

  constructor(string _name, string _symbol) public {
    reserveRatio = CURVE_RATIO;
    _mint(msg.sender, INITIAL_SUPPLY);
    poolBalance = INITAL_BALANCE;
    gasPrice = 50 * (10 ** 10);
  }
}
```
