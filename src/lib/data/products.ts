import type { Product } from '../models';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'CHERR.IO',
    url: 'https://cherr.io',
    title: 'Transparent charitable giving on the blockchain',
    status: 'Public testnet beta · Polygon',
    excerpt:
      'A donation platform where every cent is on the record. Donations are held in a smart-contract escrow for each campaign and released to verified charities in steps, only after donors review the receipts and vote. If a campaign falls short or donors reject the evidence, they get their money back or pass it to the Emergency Pool. Donors can give by card or crypto wallet, no crypto knowledge needed, and charities are ranked publicly by a Trust Score on the Charity Market Cap.',
    tags: ['Smart-contract escrow', 'Card & crypto donations', 'On-chain voting', 'Trust Score'],
  },
  {
    id: 2,
    name: 'PollinationX',
    url: 'https://pollinationx.io/',
    title: 'Decentralized storage infrastructure and service layer',
    excerpt:
      'An infrastructure layer that gives developers access to custom decentralized storage nodes through dedicated service APIs and an SDK, with read and write methods for supported decentralized storage out of the box. End users get dynamic NFTs with preset storage and bandwidth capacity.',
    tags: ['Storage nodes', 'APIs & SDK', 'Dynamic NFTs'],
  },
  {
    id: 4,
    name: 'W3XShare',
    url: 'https://w3xshare.com/',
    title: 'Encrypted file sharing between wallets',
    excerpt:
      'A secure, self-custodial way to send encrypted data files from wallet to wallet. W3XShare combines blockchain networks, decentralized storage and communication protocols, and its modular architecture is also available as a white-label solution for launching your own data-sharing app.',
    tags: ['Wallet-to-wallet', 'Encrypted transfers', 'Self-custodial', 'White-label'],
    docsUrl: 'https://wiki.w3xshare.com/',
  },
  {
    id: 3,
    name: 'PX dApp',
    url: 'https://app.pollinationx.io/',
    title: 'Decentralized storage and file hosting',
    excerpt:
      'A "Cloud Storage Drive" experience on decentralized storage. Users store and access files in a self-custodial, permissionless way and sync documents and photos across every device that supports a Web3 wallet.',
    tags: ['Self-custodial', 'Web3 wallet login', 'Cross-device sync'],
  },
];
