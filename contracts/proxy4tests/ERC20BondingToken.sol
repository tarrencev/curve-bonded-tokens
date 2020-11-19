import "../ERC20BondingToken.sol";

contract ProxyERC20BondingToken  is ERC20BondingToken  {

       function test_curvedMint(uint256  amount) public  returns (uint256 ){
    return _curvedMint(amount);
   }

   function test_curvedBurn(uint256  amount) public  returns (uint256 ){
    return _curvedBurn(amount);
   }


}