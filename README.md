`#react.js` `#master-in-software-engineering`

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Initial Coin Offering

This is an Initial Coin Offering (ICO) built with smart contracts powered by Ethereum. It basically consists in a set of smart contracts to raise funds from different investors, providing them a new ERC20 token.

## Table of Contents

- [Getting Started](#getting-started)
- [The Project](#the-project)
- [Project requirements](#project-requirements)
- [Resources](#resources)

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

See deployment for notes on how to deploy the project on a live system.

### The repository

First, you will need to `clone` or `fork` the repository into your Github
account:

<img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="Fork on GitHub" width='450'>

```
$ git clone https://github.com/miquelTC/initial-coin-offering.git
```

### Installing

First, you will need to install the dependencies with: `npm install`.

Run the following command in your terminal after cloning the main repo:

```
$ npm install
```

Secondly, you will need to install Truffle globally by running the following command int your terminal:

```
$ npm install -g truffle
```

### Running the Tests

First, you will have to compile the smart contracts by running the following command in your terminal:

```
$ truffle compile
```

Then you will have to install and run Ganache to run your blockchain locally:

https://www.trufflesuite.com/ganache

Then, the tests that validate your solution can be executed by runing the following
command:

```
$ truffle test
```

### Deployment

In order to deploy your smart contract, you must create your .env file and specify:

- `MNEMONIC` --> chose a set of words which will be the seed of your wallet
- `INFURA_API_KEY` --> API key provided by Infura: https://infura.io

Then, you will need to run the following command (let's use the testnet Ropsten in this example):

```
$ truffle migrate --network ropsten
```

### Technologies used

- `Solidity`
- `JavaScript`
- `Truffle`
- `Web3.js`
- `Ganache`
- `Node.js`

## The Project



## Project requirements



## Resources

- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- [reactjs.org](https://reactjs.org/)