import type { Service } from '../models';

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Smart contracts',
    subtitle: 'design & testing',
    description:
      'Solidity smart contracts for tokens, NFTs, escrow, payments and on-chain governance. Designed for security from the first line, fully tested and documented, so your logic runs exactly as agreed, without intermediaries.',
  },
  {
    id: 2,
    title: 'dApp development',
    subtitle: 'idea to mainnet',
    description:
      'End-to-end decentralized applications: product design, wallet onboarding that works for non-crypto users, front-end, back-end and smart contracts. We take your product from prototype to launch and keep it running.',
  },
  {
    id: 3,
    title: 'Web3 infrastructure',
    subtitle: 'storage & data',
    description:
      'Decentralized storage, IPFS, APIs and SDKs, built on the experience of running our own infrastructure layer, PollinationX. We connect blockchain with your existing systems so data and services work together.',
  },
  {
    id: 4,
    title: 'Digital transformation',
    subtitle: 'beyond blockchain',
    description:
      'Not everything needs a blockchain. We map your processes and build the right software for them, from custom web platforms to automation, adding Web3 only where it brings real transparency, trust or savings.',
  },
];
