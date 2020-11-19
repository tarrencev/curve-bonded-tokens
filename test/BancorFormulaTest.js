const truffleAssert = require('truffle-assertions');
const BancorFormula = artifacts.require('BancorFormula');
const ERC20BondingToken = artifacts.require('ERC20BondingToken');
const EthBondingToken = artifacts.require('EthBondingToken');
const Power = artifacts.require('Power');
const TestERC20BondingToken = artifacts.require('TestERC20BondingToken');
const TestEthBondingToken = artifacts.require('TestEthBondingToken');
const Roles = artifacts.require('openzeppelin-eth/contracts/access/Roles.sol');
const MinterRole = artifacts.require(
  'openzeppelin-eth/contracts/access/roles/MinterRole.sol',
);
const PauserRole = artifacts.require(
  'openzeppelin-eth/contracts/access/roles/PauserRole.sol',
);
const Pausable = artifacts.require(
  'openzeppelin-eth/contracts/lifecycle/Pausable.sol',
);
const SafeMath = artifacts.require(
  'openzeppelin-eth/contracts/math/SafeMath.sol',
);
const ERC20 = artifacts.require(
  'openzeppelin-eth/contracts/token/ERC20/ERC20.sol',
);
const ERC20Detailed = artifacts.require(
  'openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol',
);
const ERC20Mintable = artifacts.require(
  'openzeppelin-eth/contracts/token/ERC20/ERC20Mintable.sol',
);
const ERC20Pausable = artifacts.require(
  'openzeppelin-eth/contracts/token/ERC20/ERC20Pausable.sol',
);
const StandaloneERC20 = artifacts.require(
  'openzeppelin-eth/contracts/token/ERC20/StandaloneERC20.sol',
);
const Initializable = artifacts.require('zos-lib/contracts/Initializable.sol');

contract('BancorFormula', (accounts) => {
  let trace = false;
  let contractRoles = null;
  let contractSafeMath = null;
  let contractPauserRole = null;
  let contractERC20Pausable = null;
  let contractERC20Mintable = null;
  let contractERC20Detailed = null;
  let contractInitializable = null;
  let contractMinterRole = null;
  let contractERC20 = null;
  let contractPausable = null;
  let contractStandaloneERC20 = null;
  let contractERC20BondingToken = null;
  let contractTestEthBondingToken = null;
  let contractTestERC20BondingToken = null;
  let contractEthBondingToken = null;
  let contractBancorFormula = null;
  let contractPower = null;
  beforeEach(async () => {
    contractRoles = await Roles.new({from: accounts[0]});
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    PauserRole.link('Roles', contractRoles.address);
    contractPauserRole = await PauserRole.new({from: accounts[0]});
    contractERC20Pausable = await ERC20Pausable.new({from: accounts[0]});
    contractERC20Mintable = await ERC20Mintable.new({from: accounts[0]});
    contractInitializable = await Initializable.new({from: accounts[0]});
    MinterRole.link('Roles', contractRoles.address);
    contractMinterRole = await MinterRole.new({from: accounts[0]});
    ERC20.link('SafeMath', contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    contractPausable = await Pausable.new({from: accounts[0]});
    contractStandaloneERC20 = await StandaloneERC20.new({from: accounts[0]});
    contractERC20BondingToken = await ERC20BondingToken.new({
      from: accounts[0],
    });
    contractTestEthBondingToken = await TestEthBondingToken.new({
      from: accounts[0],
    });
    contractTestERC20BondingToken = await TestERC20BondingToken.new({
      from: accounts[0],
    });
    contractEthBondingToken = await EthBondingToken.new({from: accounts[0]});
    BancorFormula.link('SafeMath', contractSafeMath.address);
    contractBancorFormula = await BancorFormula.new({from: accounts[0]});
    contractPower = await Power.new({from: accounts[0]});
  });

  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(0, 65, 70, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(45, 0, 70, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(45, 65, 0, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(45, 65, 1000001, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(0, 255, 86, 72, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(88, 0, 86, 72, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(88, 255, 0, 72, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(88, 255, 1000001, 72, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(0, 125, 1000000, 73, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(85, 0, 1000000, 73, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(85, 125, 0, 73, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(85, 125, 1000001, 73, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(85, 0, 1000000, 73, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(0, 257, 65, 34, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(105, 0, 65, 34, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(105, 257, 0, 34, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculatePurchaseReturn(105, 257, 1000001, 34, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(0, 90, 79, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(66, 0, 79, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(66, 90, 0, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(66, 90, 1000001, 0, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(66, 90, 79, 67, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(0, 32736, 120, 36, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(58, 0, 120, 36, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(58, 32736, 0, 36, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(58, 32736, 1000001, 36, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(58, 32736, 120, 59, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(0, 3, 3, 40, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(40, 0, 3, 40, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(40, 3, 0, 40, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(40, 3, 1000001, 40, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(40, 3, 3, 41, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(0, 119, 74, 110, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(2014223716, 0, 74, 110, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(2014223716, 119, 0, 110, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(2014223716, 119, 1000001, 110, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(
        2014223716,
        119,
        74,
        2014223717,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(0, 61, 1000000, 101, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(115, 0, 1000000, 101, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(115, 61, 0, 101, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(115, 61, 1000001, 101, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(115, 61, 1000000, 116, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(0, 61, 1000000, 101, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(0, 1532892064, 50, 29, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(39, 0, 50, 29, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(39, 1532892064, 0, 29, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(39, 1532892064, 1000001, 29, {
        from: accounts[0],
      }),
      'revert',
    );
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(
      contractBancorFormula.calculateSaleReturn(39, 1532892064, 50, 40, {
        from: accounts[0],
      }),
      'revert',
    );
  });
});
