import { Contract, Wallet, providers }  from 'ethers';
import * as BEP20 from './contract/BEP20/bep20.js';
import * as PancakeFactory from './contract/pancake-v2/factory.js';

//BSC RPC endpoint URL
const strJsonRpcProvider = 'https://bsc-dataseed2.defibit.io/';

const bscProvider = new providers.JsonRpcProvider(strJsonRpcProvider);

const contractPancakeFactory = new Contract(
  PancakeFactory.address,
  PancakeFactory.ABI,
  bscProvider
);

//PancakeSwap Factory PairCreated event
contractPancakeFactory.on('PairCreated', async (token0Addr, token1Addr, pairAddr) => {

  let token0Contract = new Contract(token0Addr, BEP20.TokenABI, bscProvider);
  let token1Contract = new Contract(token1Addr, BEP20.TokenABI, bscProvider);
  let token0Name, token1Name;
  try {
    token0Name = await token0Contract.symbol();
    token1Name = await token1Contract.symbol();
    console.log(`${new Date().toISOString()} | Token Pair created | ${token0Name}:${token1Name} | ${token0Addr}:${token1Addr} @ ${pairAddr}`);
  }catch(e) {
    console.error(e);
  }

});

console.log('Pancake Factory Subscribed!');