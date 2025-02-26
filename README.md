# Initial Coin Offering (ICO) Smart Contract

[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-blue)](https://docs.soliditylang.org/en/v0.8.0/)
[![Truffle](https://img.shields.io/badge/Truffle-5.x-orange)](https://www.trufflesuite.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive Initial Coin Offering (ICO) implementation built on Ethereum using smart contracts. This project enables fundraising through a new ERC-20 token with multiple phases and security features.

## Features

- 🔒 Minted crowdsale - Tokens are minted on-demand when investors send ETH
- 💰 Capped fundraising - Maximum limit on total funds raised
- ⏱️ Timed phases - Distinct pre-ICO and ICO phases with different rates
- ✅ Whitelisted - KYC verification required for participation
- 💸 Refundable - Investors can claim refunds if goal isn't met
- ⏸️ Token transfer pause - Transfers locked until crowdsale completion

## Architecture

The ICO consists of three main phases:

### 1. Pre-ICO Phase

- Early investor phase with better token rates
- Direct ETH to token conversion
- Non-refundable investments

### 2. ICO Phase

- Main fundraising phase
- Lower token conversion rate
- Refundable if goal not met
- Funds held in RefundVault contract

### 3. Post-ICO Phase

Two possible outcomes:

- Goal Met: Funds released to owner, tokens unlocked
- Goal Not Met: Investors can claim refunds

## Getting Started

### Prerequisites

- Node.js >= 14
- npm >= 6
- Truffle
- Ganache (for local blockchain)
- MetaMask or similar Web3 wallet

### Installation

1. Clone the repository

```bash
git clone https://github.com/devincredible/initial-coin-offering.git
cd initial-coin-offering
```

2. Install dependencies

```bash
npm install
npm install -g truffle
```

3. Create .env file with:

```
MNEMONIC=your wallet seed phrase
INFURA_API_KEY=your infura api key
```

### Development & Testing

1. Compile contracts

```bash
truffle compile
```

2. Start Ganache for local blockchain

3. Run tests

```bash
truffle test
```

### Deployment

Deploy to testnet (e.g. Ropsten):

```bash
truffle migrate --network ropsten
```

## Token Distribution

After successful ICO completion:

- Investors: Tokens distributed based on contribution
- Founders: Time-locked tokens with vesting
- Foundation: Reserved allocation with timelock
- Partners: Strategic allocation with vesting

## Tech Stack

- `Solidity` - Smart contract development
- `Truffle` - Development framework
- `Web3.js` - Ethereum JavaScript API
- `Ganache` - Local blockchain
- `Node.js` - Runtime environment

## Resources

- [Ethereum Documentation](https://ethereum.org/)
- [Truffle Suite](https://www.trufflesuite.com/)
- [Web3.js Docs](https://web3js.readthedocs.io/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
