import "../EthBondingToken.sol";

contract ProxyEthBondingToken  is EthBondingToken  {

       function test_curvedMint() public  returns (uint256 ){
    return _curvedMint();
   }

   function test_curvedBurn(uint256  amount) public  returns (uint256 ){
    return _curvedBurn(amount);
   }


}