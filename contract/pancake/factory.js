export const address = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
export const eventPairCreated = {
  ABI : [{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "token0",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "token1",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "pair",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "PairCreated",
    "type": "event"
  }],
  eventName : 'PairCreated'
};