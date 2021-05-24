import { AssertionError, use } from 'chai';
import ether from './helpers/ether';

const Token = artifacts.require('Token');
const TokenCrowdsale = artifacts.require('TokenCrowdsale');

require('chai')
    use(require('chai-as-promised'))
    .should();

contract('TokenCrowdsale', ([_, _wallet, investor1, investor2]) => {

    let token;
    let crowdsale;

    // Token config
    const name = 'mTC Token';
    const symbol = 'mTC';
    const decimals = 18;

    // TokenCrowdsale config
    const rate = 500;
    const wallet = _wallet;
    const cap = ether(100);

    beforeEach(async () => {
        token = await Token.new(name, symbol, decimals); // Deploy Token
        crowdsale = await TokenCrowdsale.new(rate, wallet, token.address, cap) // Deploy TokenCrowdsale
        await token.transferOwnership(crowdsale.address);
    });

    // describe('crowdsale', () => {
    //     it('tracks the rate', async () => {
    //         const _rate = await crowdsale.rate();
    //         _rate.toString().should.equal(rate.toString());
    //     });

    //     it('tracks the wallet', async () => {
    //         const _wallet = await crowdsale.wallet();
    //         _wallet.toString().should.equal(wallet.toString());
    //     });

    //     it('tracks the token', async () => {
    //         const _token = await crowdsale.token();
    //         _token.should.equal(token.address);
    //     });
    // });

    // describe('minted crowdsale', () => {
    //     it('mints tokens after purchase', async() => {
    //         const originalTotalSupply = await token.totalSupply();
    //         await crowdsale.sendTransaction({ value: ether(1), from: investor1 });
    //         const newTotalSupply = await token.totalSupply();
    //         assert.isTrue(newTotalSupply > originalTotalSupply);
    //     });
    // });

    describe('capped crowdsale', () => {
        it('has the correct cap', async () => {
            const _cap = await crowdsale.cap();
            _cap.toString().should.equal(cap.toString());
        })
    })
    
    // describe('accepting payments', () => {
    //     it('should accept payments', async () => {
    //         const value = ether(1);
    //         const purchaser = investor2;
    //         await crowdsale.sendTransaction({ value: value, from: investor1 }).should.be.fulfilled;
    //         await crowdsale.buyTokens(investor1, { value: value, from: purchaser }).should.be.fulfilled;
    //     });
    // });
});    