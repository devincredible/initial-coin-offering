pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/detailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract Token is StandardToken, DetailedERC20 {
    constructor(string _name, string _symbol, uint8 _decimals)
        DetailedERC20(_name, _symbol, _decimals)
        public
    {

    }
}