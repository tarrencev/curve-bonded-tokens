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
const ProxyERC20BondingToken = artifacts.require('ProxyERC20BondingToken');

contract('contractProxyERC20BondingToken', (accounts) => {
  let contractProxyERC20BondingToken = null;
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
    contractProxyERC20BondingToken = await ProxyERC20BondingToken.new({
      from: accounts[0],
    });
  });

  it('Should fail test_curvedMint(uint256) when NOT comply with: msg.gasprice <= gasPrice', async () => {
    let result = await truffleAssert.fails(
      contractProxyERC20BondingToken.test_curvedMint(1, {from: accounts[6]}),
      'revert',
    );
  });
  it('Should fail test_curvedMint(uint256) when NOT comply with: amount > 0', async () => {
    let result = await truffleAssert.fails(
      contractProxyERC20BondingToken.test_curvedMint(0, {from: accounts[6]}),
      'revert',
    );
  });
});
