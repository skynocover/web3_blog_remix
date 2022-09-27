import { ethers } from 'ethers';
import { abi, address } from '~/contract.json';

const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_KEY);
// const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_KEY);

export default new ethers.Contract(address, abi, provider);
