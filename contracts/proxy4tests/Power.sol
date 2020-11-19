import "../math/Power.sol";

contract ProxyPower  is Power  {

      constructor() public  {}
   function testpower(uint256  _baseN, uint256  _baseD, uint32  _expN, uint32  _expD) public view returns (uint256 , uint8 ){
    return power(_baseN,_baseD,_expN,_expD);
   }

   function testgeneralLog(uint256  _x) public pure returns (uint256 ){
    return generalLog(_x);
   }

   function testfloorLog2(uint256  _n) public pure returns (uint8 ){
    return floorLog2(_n);
   }

   function testfindPositionInMaxExpArray(uint256  _x) public view returns (uint8 ){
    return findPositionInMaxExpArray(_x);
   }

   function testgeneralExp(uint256  _x, uint8  _precision) public pure returns (uint256 ){
    return generalExp(_x,_precision);
   }

   function testoptimalLog(uint256  x) public pure returns (uint256 ){
    return optimalLog(x);
   }

   function testoptimalExp(uint256  x) public pure returns (uint256 ){
    return optimalExp(x);
   }


}