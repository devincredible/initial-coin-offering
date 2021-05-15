const Token = artifacts.require('Token');
const TokenCrowdsale = artifacts.require('TokenCrowdsale');

require('chai')
    .should();

contract('TokenCrowdsale', ([_, _wallet]) => {

    let token;
    let tokencrowdsale;

    // Token config
    const name = 'mTC Token';
    const symbol = 'mTC';
    const decimals = 18;

    // TokenCrowdsale config
    const rate = 500;
    const wallet = '';
    const tokenAddress = '';

    beforeEach(async () => {
        token = await Token.new(name, symbol, decimals); // Deploy Token
        tokencrowdsale = await TokenCrowdsale.new(rate, wallet, tokenAddress) // Deploy TokenCrowdsale
    })
})    