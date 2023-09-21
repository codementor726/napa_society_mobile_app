import { athereum } from '../assets/iconIndex';
import { CURRENCIES } from '../typings/currenices';

// Staging
const NETWORK = [
  {
    id: 1,
    title: 'Polygon',
    value: "5",
    currencyName: CURRENCIES.MATIC,
  },
  {
    id: 2,
    title: 'Ethereum',
    value: "0",
    currencyName: CURRENCIES.ETH,
  },
  {
    id: 4,
    title: 'Sepolia Testnet',
    value: "2",
    currencyName: CURRENCIES.SEPOLIA,
  },
];
export { NETWORK };

// Production
// const NETWORK = [
//   {
//     id: 2,
//     title: 'Ethereum',
//     value: "0",
//     currencyName: CURRENCIES.ETH,
//   },
// ];
// export { NETWORK };