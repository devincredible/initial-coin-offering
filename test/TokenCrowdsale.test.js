const Token = artifacts.require('Token');
const TokenCrowdsale = artifacts.require('TokenCrowdsale');

require('chai')
    .should();

contract('TokenCrowdsale', ([_, _wallet]) => {

    let token;
    let crowdsale;

    // Token config
    const name = 'mTC Token';
    const symbol = 'mTC';
    const decimals = 18;

    // TokenCrowdsale config
    const rate = 500;
    const wallet = _wallet;

    beforeEach(async () => {
        token = await Token.new(name, symbol, decimals); // Deploy Token
        crowdsale = await TokenCrowdsale.new(rate, wallet, token.address) // Deploy TokenCrowdsale
    });

    describe('crowdsale', () => {
        it('tracks the rate', async () => {
            const _rate = await crowdsale.rate();
            _rate.toString().should.equal(rate.toString());
        });

        it('tracks the wallet', async () => {
            const _wallet = await crowdsale.wallet();
            _wallet.toString().should.equal(wallet.toString());
        });

        it('tracks the token', async () => {
            const _token = await crowdsale.token();
            _token.should.equal(token.address);
        });
    });
});    