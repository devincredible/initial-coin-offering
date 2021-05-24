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
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";

contract TokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale {
    
    uint256 public investorMinCap = 2000000000000000; // Minimum investor contribution - 0.002 Ether
    uint256 public investorMaxCap = 50000000000000000000; // Maximum investor contribution - 50 Ether
    mapping(address => uint256) contributions;
    
    constructor(
        uint256 _rate, 
        address _wallet, 
        ERC20 _token,
        uint256 _cap,
        uint256 _openingTime,
        uint256 _closingTime
    ) 
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        public 
    {

    }

    function getUserContribution(address _beneficiary) public view returns(uint256) {
        return contributions[_beneficiary];
    }
    
    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        super._preValidatePurchase(_beneficiary, _weiAmount); // call parent contract and its function _preValidatePurchase
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(_newContribution >= investorMinCap && _newContribution <= investorMaxCap);
        contributions[_beneficiary] = _newContribution;
    }

}