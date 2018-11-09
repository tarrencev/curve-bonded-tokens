const ERC20BondingToken = artifacts.require("ERC20BondingToken");
const EthBondingToken = artifacts.require("EthBondingToken");
const TestToken = artifacts.require("TestToken");

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(TestToken);
  await deployer.deploy(ERC20BondingToken);
  await deployer.deploy(EthBondingToken);
};
