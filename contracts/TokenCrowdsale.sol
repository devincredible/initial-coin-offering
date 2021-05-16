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
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract TokenCrowdsale is Crowdsale, MintedCrowdsale {
    
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