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
import "openzeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";

contract TokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, WhitelistedCrowdsale, RefundableCrowdsale {
    
    // Track investor contributions
    uint256 public investorMinCap = 2000000000000000; // Minimum investor contribution - 0.002 Ether
    uint256 public investorMaxCap = 50000000000000000000; // Maximum investor contribution - 50 Ether
    mapping(address => uint256) contributions;
    
    // Crowdsale Stages
    enum CrowdsaleStage { PreICO, ICO }
    CrowdsaleStage public stage = CrowdsaleStage.PreICO;
    
    constructor(
        uint256 _rate, 
        address _wallet, 
        ERC20 _token,
        uint256 _cap,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _goal
    ) 
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        RefundableCrowdsale(_goal)
        public 
    {
        require(_goal <= _cap);
    }

    /**
    * @dev Returns the amount contributed so far by a sepecific user.
    * @param _beneficiary Address of contributor
    * @return User contribution so far
    */    
    function getUserContribution(address _beneficiary) public view returns(uint256) {
        return contributions[_beneficiary];
    }

    /**
    * @dev Allows admin to update the crowdsale stage
    * @param _stage Crowdsale stage
    */    
    function setCrowdsaleStage(uint _stage) public onlyOwner {
        if(uint(CrowdsaleStage.PreICO) == _stage) {
            stage = CrowdsaleStage.PreICO;        
        } else if(uint(CrowdsaleStage.ICO) == _stage) {
            stage = CrowdsaleStage.ICO;
        }
    }
    
    /**
    * @dev Extend parent behavior requiring purchase to respect investor min/max funding cap.
    * @param _beneficiary Token purchaser
    * @param _weiAmount Amount of wei contributed
    */    
    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        super._preValidatePurchase(_beneficiary, _weiAmount); // call parent contract and its function _preValidatePurchase
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(_newContribution >= investorMinCap && _newContribution <= investorMaxCap);
        contributions[_beneficiary] = _newContribution;
    }

}