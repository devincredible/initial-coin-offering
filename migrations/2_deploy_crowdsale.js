const Token = artifacts.require("./Token.sol");

module.exports = function (deployer) {
    const _name = "mTC Token";
    const _symbol = "mTC";
    const _decimals = 18;
    
    deployer.deploy(Token, _name, _symbol, _decimals);
};