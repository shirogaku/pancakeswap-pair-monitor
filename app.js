import { Contract, Wallet, providers }  from 'ethers';
import * as ABI from './token-abi.js';
import * as PancakeFactory from './contract/pancake/factory.js';

//Put wallet mnemonic here
const strWalletMnemonic = '';
//BSC RPC endpoint URL
const strJsonRpcProvider = 'https://bsc-dataseed2.defibit.io/';

const bscProvider = new providers.JsonRpcProvider(strJsonRpcProvider);
const walletMnemonic = Wallet.fromMnemonic(strWalletMnemonic);

const walletInstance = walletMnemonic.connect(bscProvider);

const contractPancakeFactory = new Contract(
  PancakeFactory.address,
  PancakeFactory.eventPairCreated.ABI,
  walletInstance
);

console.log('Pancake Factory Subscribed!');

contractPancakeFactory.on(PancakeFactory.eventPairCreated.eventName, async (token0Addr, token1Addr, pairAddr) => {

  let token0Contract = new Contract(token0Addr, ABI.TokenABI, bscProvider);
  let token1Contract = new Contract(token1Addr, ABI.TokenABI, bscProvider);
  let token0Name = await token0Contract.symbol();
  let token1Name = await token1Contract.symbol();

  console.log(`${new Date().toISOString()} | Token Pair created | ${token0Name}:${token1Name} | ${token0Addr}:${token1Addr} @ ${pairAddr}`);
});