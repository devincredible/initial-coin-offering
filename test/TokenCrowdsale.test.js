import ether from './helpers/ether';
import EVMRevert from './helpers/EVMRevert';
import { increaseTimeTo, duration } from './helpers/increaseTime';
import latestTime from './helpers/latestTime';


const Token = artifacts.require('Token');
const TokenCrowdsale = artifacts.require('TokenCrowdsale');
const RefundVault = artifacts.require('./RefundVault');
const TokenTimelock = artifacts.require('./TokenTimelock');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('TokenCrowdsale', ([_, _wallet, investor1, investor2, _foundersFund, _foundationFund, _partnersFund]) => {

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
    let releaseTime;

    const goal = ether(50);

    let foundersFund = _foundersFund;
    const foundationFund = _foundationFund;
    const partnersFund = _partnersFund;

    let vaultAddress;
    let vault;

    const preICOStage = 0;
    const ICOStage = 1;
    const preICORate = 500;
    const ICORate = 250;

    const tokenSalePercentage = 70;
    const foundersPercentage = 10;
    const foundationPercentage = 10;
    const partnersPercentage = 10;
  
    beforeEach(async () => {
        openingTime = await latestTime() + duration.weeks(1);
        closingTime = await openingTime + duration.weeks(1);
        releaseTime = closingTime + duration.years(1);
        token = await Token.new(name, symbol, decimals); // Deploy Token
        crowdsale = await TokenCrowdsale.new(rate, wallet, token.address, cap, openingTime, closingTime, goal, foundersFund, foundationFund, partnersFund, releaseTime); // Deploy TokenCrowdsale
        await token.pause(); // Pause the token
        await token.transferOwnership(crowdsale.address); // transfer ownership of the token to the crowdsale
        await crowdsale.addManyToWhitelist([investor1, investor2]) // Add investors to the whitelist
        await increaseTimeTo(openingTime + 1); // Advance time to crowdsale start
        
        // Track refund vault
        vaultAddress = await crowdsale.vault(); 
        vault = await RefundVault.at(vaultAddress); // Create a new abstraction to represent the contract at that address
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

    // describe('capped crowdsale', () => {
    //     it('has the correct cap', async () => {
    //         const _cap = await crowdsale.cap();
    //         _cap.toString().should.equal(cap.toString());
    //     });
    // });

    // describe('timed crowdsale', () => {
    //     it('is open', async() => {
    //         const isClosed = await crowdsale.hasClosed();
    //         isClosed.should.be.false;
    //     });
    // });

    // describe('whitelisted crowdsale', () => {
    //     it('rejects contributions from non-whitelisted investors', async() => {
    //         const notWhitelisted = _;
    //         await crowdsale.buyTokens(notWhitelisted, { value: ether(1), from: notWhitelisted }).should.be.rejectedWith(EVMRevert);
    //     });
    // });

    // describe('refundable crowdsale', () => {
    //     beforeEach(async() => {
    //         await crowdsale.buyTokens(investor1, { value: ether(1), from: investor1 });
    //     });

    //     describe('during crowdsale', async() => {
    //         it('prevents the investor from claiming refund', async() => {
    //             await vault.refund(investor1, { from: investor1 }).should.be.rejectedWith(EVMRevert);
    //         });
    //     });

    //     describe('when the stage is preICO', async() => {
    //         it('forwards funds to the wallet', async() => {
    //             const balance = await web3.eth.getBalance(wallet);
    //             expect(Number(balance)).to.be.above(Number(ether(100)));
    //         });
    //     });

    //     describe('when the stage is ICO', async() => {
    //         it('forwards funds to the refund vault', async() => {
    //             await crowdsale.setCrowdsaleStage(ICOStage, { from: _ });
    //             await crowdsale.buyTokens(investor1, { value: ether(1), from: investor1 });
    //             const balance = await web3.eth.getBalance(vaultAddress);
    //             expect(Number(balance)).to.be.above(0);
    //         });
    //     });

    //     describe('during crowdsale', async() => {
    //         it('prevents the investor from claiming refund', async() => {
    //             await vault.refund(investor1, { from: investor1 }).should.be.rejectedWith(EVMRevert);
    //         });
    //     });
    // });

    // describe('crowdsale stages', () => {
    //     it('it starts in preICO', async() => {
    //         const stage = await crowdsale.stage();
    //         stage.toString().should.equal(preICOStage.toString());
    //     });

    //     it('it starts at the preICO rate', async() => {
    //         const _rate = await crowdsale.rate();
    //         _rate.toString().should.equal(preICORate.toString());
    //     });

    //     it('allows admin to update the stage and the rate', async() => {
    //         await crowdsale.setCrowdsaleStage(ICOStage, { from: _ });
    //         const stage = await crowdsale.stage();
    //         stage.toString().should.equal(ICOStage.toString());
    //         const _rate = await crowdsale.rate();
    //         _rate.toString().should.equal(ICORate.toString());
    //     });

    //     it('prevents non-admin from updatign the stage', async() => {
    //         await crowdsale.setCrowdsaleStage(ICOStage, { from: investor1 }).should.be.rejectedWith(EVMRevert);
    //     });
    // });
    
    // describe('accepting payments', () => {
    //     it('should accept payments', async () => {
    //         const value = ether(1);
    //         const purchaser = investor2;
    //         await crowdsale.sendTransaction({ value: value, from: investor1 }).should.be.fulfilled;
    //         await crowdsale.buyTokens(investor1, { value: value, from: purchaser }).should.be.fulfilled;
    //     });
    // });

    // describe('buyTokens()', () => {
    //     describe('when contribution is less than the minimum cap', () => {
    //         it('rejects the transaction', async() => {
    //             const value = minCap - 1;
    //             await crowdsale.buyTokens(investor2, { value: value, from: investor2 }).should.be.rejectedWith(EVMRevert);
    //         });
    //     });

    //     describe('when investor has already met the minimum cap', () => {
    //         it('allows the investor to contribute below the minimum cap', async() => {
    //             // First contribution
    //             const value1 = ether(1);
    //             await crowdsale.buyTokens(investor1, { value: value1, from: investor1 });
    //             // Second contribution
    //             const value2 = 1; // 1 wei
    //             await crowdsale.buyTokens(investor1, { value: value2, from: investor1 }).should.be.fulfilled;
    //         });
    //     });

    //     describe('when the total contributions exceed the investor max cap', () => {
    //         it('rejects the transaction', async() => {
    //             // First contribution
    //             const value1 = ether(2);
    //             await crowdsale.buyTokens(investor1, { value: value1, from: investor1 });
    //             // Second contribution
    //             const value2 = maxCap;
    //             await crowdsale.buyTokens(investor1, { value: value2, from: investor1 }).should.be.rejectedWith(EVMRevert);
    //         });

    //     });

    //     describe('when contribution is within the valid range', () => {
    //         it('succeeds and updates the contribution amount', async() => {
    //             const value = ether(2);
    //             await crowdsale.buyTokens(investor2, { value: value, from: investor2 }).should.be.fulfilled;
    //             const contribution = await crowdsale.getUserContribution(investor2);
    //             contribution.toString().should.equal(value.toString());
    //         });
    //     });
    // });

    // describe('token transfers', function () {
    //     it('investors cannot transfer tokens during crowdsale', async function () {
    //         // Buy some tokens first
    //         await crowdsale.buyTokens(investor1, { value: ether(1), from: investor1 });
    //         // Attempt to transfer tokens during crowdsale
    //         await token.transfer(investor2, 1, { from: investor1 }).should.be.rejectedWith(EVMRevert);
    //     });
    // });
    
    describe('finalizing the crowdsale', () => {
        describe('when the goal is NOT reached', () => {
            beforeEach(async() => {
                // Do not meet the goal
                await crowdsale.buyTokens(investor2, { value: ether(1), from: investor2 });
                // Fastforward past end time
                await increaseTimeTo(closingTime + 1);
                // Finalize the crowdsale
                await crowdsale.finalize({ from: _ });
            });

            it('investors can claim refund', async() => {
                await vault.refund(investor2).should.be.fulfilled;
            });
        });

        describe('when the goal is reached', async() => {
            
            beforeEach(async() => {
                // track current wallet balance
                let walletBalance = await web3.eth.getBalance(wallet);
                // Meet the goal
                await web3.eth.sendTransaction({ from: _, to: investor1, value: ether(25) }); // Transfer extra ether to investor1 account
                await crowdsale.buyTokens(investor1, { value: ether(26), from: investor1 });
                await crowdsale.buyTokens(investor2, { value: ether(26), from: investor2 });
                // Fastforward past end time
                await increaseTimeTo(closingTime + 1);
                // Finalize the crowdsale
                await crowdsale.finalize({ from: _ });
            });

            it('handles goal reached', async() => {
                // Trackes the goal reached
                const goalReached = await crowdsale.goalReached();
                goalReached.should.be.true;

                // Finishes minting the token
                const mintingFinished = await token.mintingFinished();
                mintingFinished.should.be.true;

                // Unpauses the token
                const paused = await token.paused();
                paused.should.be.false

                // Enables token Transfer
                await token.transfer(investor2, 1, { from: investor2 }).should.be.fulfilled;

                let totalSupply = await token.totalSupply();
                totalSupply = totalSupply.toString();

                // Founders
                const foundersTimelockAddress = await crowdsale.foundersTimelock();
                let foundersTimelockBalance = await token.balanceOf(foundersTimelockAddress);
                foundersTimelockBalance = foundersTimelockBalance / (10 ** decimals);

                let foundersAmount = totalSupply / foundersPercentage;
                foundersAmount = foundersAmount / (10 ** decimals);

                assert.equal(foundersTimelockBalance.toString(), foundersAmount.toString());

                // Foundation
                const foundationTimelockAddress = await crowdsale.foundationTimelock();
                let foundationTimelockBalance = await token.balanceOf(foundationTimelockAddress);
                foundationTimelockBalance = foundationTimelockBalance / (10 ** decimals);

                let foundationAmount = totalSupply / foundationPercentage;
                foundationAmount = foundationAmount / (10 ** decimals);

                assert.equal(foundationTimelockBalance.toString(), foundationAmount.toString());

                // Partners
                const partnersTimelockAddress = await crowdsale.partnersTimelock();
                let partnersTimelockBalance = await token.balanceOf(partnersTimelockAddress);
                partnersTimelockBalance = partnersTimelockBalance / (10 ** decimals);

                let partnersAmount = totalSupply / partnersPercentage;
                partnersAmount = partnersAmount / (10 ** decimals);

                assert.equal(partnersTimelockBalance.toString(), partnersAmount.toString());

                // Can't withdraw from timelock
                const foundersTimelock = await TokenTimelock.at(foundersTimelockAddress);
                await foundersTimelock.release().should.be.rejectedWith(EVMRevert);

                // Transfers ownership to the wallet
                const owner = await token.owner();
                owner.should.equal(wallet);

                // Prevents the investor claiming refund
                await vault.refund(investor1).should.be.rejectedWith(EVMRevert);
            });
        });
    });

    // describe('token distribution', () => {
    //     let _tokenSalePercentage;
    //     let _foundersPercentage;
    //     let _foundationPercentage;
    //     let _partnersPercentage;
        
    //     beforeEach(async() => {
    //         _tokenSalePercentage = await crowdsale.tokenSalePercentage();
    //         _foundersPercentage = await crowdsale.foundersPercentage();
    //         _foundationPercentage = await crowdsale.foundationPercentage();
    //         _partnersPercentage = await crowdsale.partnersPercentage();
    //     });
        
    //     it('tracks the distribution', async() => {            
    //         _tokenSalePercentage.toString().should.equal(tokenSalePercentage.toString(), 'has correct token sale percentage');            
    //         _foundersPercentage.toString().should.equal(foundersPercentage.toString(), 'has correct founders percentage');            
    //         _foundationPercentage.toString().should.equal(foundationPercentage.toString(), 'has correct foundation percentage');            
    //         _partnersPercentage.toString().should.equal(partnersPercentage.toString(), 'has correct partners percentage');        
    //     });

    //     it('valid percentace', async() => {
    //         const total = Number(tokenSalePercentage) + Number(foundersPercentage) + Number(foundationPercentage) + Number(partnersPercentage);
    //         total.should.equal(100);
    //     });
    // });    
});    