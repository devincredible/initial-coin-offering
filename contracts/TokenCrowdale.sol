pragma solidity 0.4.24;

// Crowdsale
// Timed Crowdsale
// Capped Crowdsale
// Minted Crowdsale
// Whitelisted Crowdsale
// Refundable Crowdsale
// Presale/Public Sale
//Token Distribution & Vesting

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";

contract TokenCrowdsale is Crowdsale {
    
    constructor(
        uint256 _rate, 
        address _wallet, 
        ERC20 _token
    ) 
        Crowdsale(_rate, _wallet, _token)
        public 
    {

    }
}