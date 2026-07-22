# 🚀 Resilient Staking DApp

![Solidity](https://img.shields.io/badge/Solidity-0.8.0-363636?logo=solidity)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![Web3.js](https://img.shields.io/badge/Web3.js-Blockchain-F16822?logo=web3.js)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

Resilient Staking DApp is a decentralized finance (DeFi) application that allows users to securely stake ERC20 tokens, earn blockchain based rewards, and manage their assets through MetaMask. The application supports both Ganache for local development and Ethereum Sepolia for public testnet deployment.

Note: This repository is an enhanced version of an existing DeFi staking application. The original project served as the foundation, while this version focuses on improving the architecture, user experience, compatibility, and deployment readiness.

---

## Features

- ERC20 Token (Tether)
- Reward Token (RWD)
- Token Staking
- Token Unstaking
- MetaMask Integration
- Multi Network Support
- Responsive UI
- Transaction Status Notifications
- Loading Overlay
- Glassmorphism UI
- Ethereum Sepolia Deployment
- Ganache Development Support

---

## Tech Stack

### Blockchain

- Solidity
- Truffle
- Ganache
- Ethereum Sepolia
- Web3.js

### Frontend

- React
- Vite
- Bootstrap
- React Toastify

### Wallet

- MetaMask

---

## Live Demo

Coming soon...

The application will be deployed on Vercel after final production checks.

## Screenshots

Coming soon.

---

## Architecture

                   MetaMask
                      │
                Ethereum Wallet
                      │
                  Web3.js
                      │
              React + Vite UI
                      │
           DecentralBank Contract
              /                \
         Tether Token       RWD Token

## Smart Contracts (Ethereum Sepolia)

| Contract | Address |
|----------|---------|
| Tether | `0x7F15B077DdBe9f813FAD69adE7Cd3B55624962c0` |
| RWD | `0xFc2Bb492843B4A7B2470c903556E5aeFdd1ab786` |
| DecentralBank | `0x929A3496EDdAaAaB8EDA7DEfddA50309729463b6` |

---

## Installation

Clone the repository

```bash
git clone https://github.com/mikeisresilient/resilient-staking-dapp.git
```

Install dependencies

```bash
npm install
```

Start the frontend

```bash
npm run dev
```

---

## Running with Ganache

1. Start Ganache
2. Deploy contracts

```bash
truffle migrate --reset
```

3. Connect MetaMask to Ganache

4. Start the application

```bash
npm run dev
```

---

## Running with Sepolia

1. Configure your `.env`

```
PRIVATE_KEY=your_private_key
ALCHEMY_URL=your_alchemy_rpc
```

2. Deploy

```bash
npx truffle migrate --network sepolia --config truffle-config.cjs
```

3. Connect MetaMask to Sepolia

4. Launch

```bash
npm run dev
```

---

## Project Structure

```
contracts/
migrations/
src/
    components/
    truffle_abis/
public/
```

---

## How It Works

1. Connect MetaMask.
2. Approve Tether tokens.
3. Stake tokens.
4. Smart contract locks the tokens.
5. Rewards are distributed.
6. User can unstake at any time.

---

## Challenges Solved

- Integrated MetaMask with React.
- Built ERC20 staking workflow.
- Supported both Ganache and Sepolia without changing frontend logic.
- Managed blockchain transaction states.
- Implemented dynamic contract loading based on network ID.

---

## Skills Demonstrated

- Solidity
- Smart Contract Development
- ERC20 Tokens
- React
- Vite
- Web3.js
- Truffle
- Ethereum
- MetaMask Integration
- Blockchain Testing
- Decentralized Application Development

---

## Future Improvements

- Reward APY calculation
- WalletConnect support
- Multiple staking pools
- Dark / Light theme
- Token price integration
- Mobile optimization
- Admin dashboard

---

## Acknowledgements

Inspired by modern DeFi staking protocols and built for educational and portfolio purposes.

---

## Author

Michael Ege

GitHub

https://github.com/mikeisresilient

---

## License

MIT License
