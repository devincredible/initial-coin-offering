import ether from './helpers/ether';
import EVMRevert from './helpers/EVMRevert';
import { increaseTimeTo, duration } from './helpers/increaseTime';
import latestTime from './helpers/latestTime';


const Token = artifacts.require('Token');
const TokenCrowdsale = artifacts.require('TokenCrowdsale');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
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
    const minCap = ether(0.002);
    const maxCap = ether(50);
    let openingTime;
    let closingTime;

    beforeEach(async () => {
        openingTime = await latestTime() + duration.weeks(1);
        closingTime = await openingTime + duration.weeks(1);
        token = await Token.new(name, symbol, decimals); // Deploy Token
        crowdsale = await TokenCrowdsale.new(rate, wallet, token.address, cap, openingTime, closingTime); // Deploy TokenCrowdsale
        await token.transferOwnership(crowdsale.address); // transfer ownership of the token to the crowdsale
        await increaseTimeTo(openingTime + 1); // Advance time to crowdsale start 
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

    describe('minted crowdsale', () => {
        it('mints tokens after purchase', async() => {
            const originalTotalSupply = await token.totalSupply();
            await crowdsale.sendTransaction({ value: ether(1), from: investor1 });
            const newTotalSupply = await token.totalSupply();
            assert.isTrue(newTotalSupply > originalTotalSupply);
        });
    });

    describe('capped crowdsale', () => {
        it('has the correct cap', async () => {
            const _cap = await crowdsale.cap();
            _cap.toString().should.equal(cap.toString());
        });
    });

    describe('timed crowdsale', () => {
        it('is open', async() => {
            const isClosed = await crowdsale.hasClosed();
            isClosed.should.be.false;
        });
    });
    
    describe('accepting payments', () => {
        it('should accept payments', async () => {
            const value = ether(1);
            const purchaser = investor2;
            await crowdsale.sendTransaction({ value: value, from: investor1 }).should.be.fulfilled;
            await crowdsale.buyTokens(investor1, { value: value, from: purchaser }).should.be.fulfilled;
        });
    });

    describe('buyTokens()', () => {
        describe('when contribution is less than the minimum cap', () => {
            it('rejects the transaction', async() => {
                const value = minCap - 1;
                await crowdsale.buyTokens(investor2, { value: value, from: investor2 }).should.be.rejectedWith(EVMRevert);
            });
        });

        describe('when investor has already met the minimum cap', () => {
            it('allows the investor to contribute below the minimum cap', async() => {
                // First contribution
                const value1 = ether(1);
                await crowdsale.buyTokens(investor1, { value: value1, from: investor1 });
                // Second contribution
                const value2 = 1; // 1 wei
                await crowdsale.buyTokens(investor1, { value: value2, from: investor1 }).should.be.fulfilled;
            });
        });

        describe('when the total contributions exceed the investor max cap', () => {
            it('rejects the transaction', async() => {
                // First contribution
                const value1 = ether(2);
                await crowdsale.buyTokens(investor1, { value: value1, from: investor1 });
                // Second contribution
                const value2 = maxCap;
                await crowdsale.buyTokens(investor1, { value: value2, from: investor1 }).should.be.rejectedWith(EVMRevert);
            });

        });

        describe('when contribution is within the valid range', () => {
            it('succeeds and updates the contribution amount', async() => {
                const value = ether(2);
                await crowdsale.buyTokens(investor2, { value: value, from: investor2 }).should.be.fulfilled;
                const contribution = await crowdsale.getUserContribution(investor2);
                contribution.toString().should.equal(value.toString());
            });
        });
    });
});    