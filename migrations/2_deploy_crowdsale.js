const Token = artifacts.require("./Token.sol");
const TokenCrowdsale = artifacts.require("./TokenCrowdsale");

function ether (n) {
    return new web3.utils.BN(
        web3.utils.toWei(n.toString(),'ether')
    );
}

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
  };

module.exports = async function (deployer, network, accounts) {
    const _name = "mTC Token";
    const _symbol = "mTC";
    const _decimals = 18;
    
    await deployer.deploy(Token, _name, _symbol, _decimals);
    const deployedToken = await Token.deployed();

    const latestTime = (new Date).getTime();
    
    const _rate             = 500;
    const _wallet           = accounts[0];
    const _token            = deployedToken.address;
    const _openingTime      = latestTime + duration.minutes(30);
    const _closingTime      = _openingTime + duration.weeks(1);
    const _cap              = ether(100);
    const _goal             = ether(50);
    const _foundersFund     = accounts[0];
    const _foundationFund   = accounts[0];
    const _partnersFund     = accounts[0];
    const _releaseTime      = _closingTime + duration.days(1);
    
    await deployer.deploy(TokenCrowdsale, _rate, _wallet, _token, _cap, _openingTime, _closingTime, _goal, _foundersFund, _foundationFund, _partnersFund, _releaseTime);
    return true;
};