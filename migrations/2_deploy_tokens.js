const ERC20BondingCurveToken = artifacts.require("ERC20BondingCurveToken");
const TestToken = artifacts.require("TestToken");

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(TestToken);
  // ERC20 _reserveToken, uint256 _initialPoolBalance, uint256 _initialSupply, uint32 _reserveRatio, uint256 _gasPrice
  await deployer.deploy(ERC20BondingCurveToken);

  // const erc20 = await ERC20.deployed();
  // erc20.mint
  //
  // const erc20BondingToken = await ERC20BondingCurveToken.deployed();
  //
  // erc20BondingToken.initialize(erc20.address, 1000000000000000000, )
};
