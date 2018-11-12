# curve-bonded-tokens

*** These contracts have not been audited, use at your own risk ***

Curve Bonded tokens based on the Bancor Formula and OpenZeppelin contracts

### Install

`npm install curve-bonded-tokens`

### Usage

Eth-backed bonded token:

```Solidity
pragma solidity ^0.4.24;

import "curve-bonded-tokens/contracts/EthBondingToken.sol";

contract Token is EthBondingToken {
  uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** 18);
  uint32 public constant RESERVE_RATIO = 150000;
  uint256 public constant GAS_PRICE = 50 * (10 ** 10);

  constructor() public {
    EthBondingToken.initialize(INITIAL_SUPPLY, RESERVE_RATIO, _gasPrice);
  }
}
```

ERC20-backed bonded token:

```Solidity
pragma solidity ^0.4.24;

import "openzeppelin-eth/contracts/token/ERC20/ERC20.sol";
import "curve-bonded-tokens/contracts/ERC20BondingToken.sol";

contract Token is ERC20BondingToken {
  uint256 public constant INITIAL_POOL_BALANCE = 1 * (10 ** 18);
  uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** 18);
  uint32 public constant RESERVE_RATIO = 150000;
  uint256 public constant GAS_PRICE = 50 * (10 ** 10);

  constructor(ERC20 _reserveToken) public {
    ERC20BondingToken.initialize(
      _reserveToken,
      INITIAL_POOL_BALANCE,
      INITIAL_SUPPLY,
      RESERVE_RATIO,
      GAS_PRICE
    );
  }
}
```
