const Token = artifacts.require('Token');

require('chai')
    .should();

contract('Token', accounts => {
    let token;
    const _name = 'mTC Token';
    const _symbol = 'mTC';
    const _decimals = 18;
    
    beforeEach(async () => {
        token = await Token.new(_name, _symbol, _decimals);
    })
    
    describe('token attributes', () => {
        it('has the correct name', async () => {
            const name = await token.name();
            name.should.equal(_name); //assert.equal(name, _name);            
        })

        it('has the correct symbol', async () => {
            const symbol = await token.symbol();
            symbol.should.equal(_symbol);
        })    
        
        it('has the correct decimals', async () => {
            const decimals = await token.decimals();
            decimals.toString().should.equal(_decimals.toString());
        }) 
    })
})