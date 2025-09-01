interface IToken {
  address: string
  image: string
  name: string
  symbol: string
  decimals: number
}

export const tokens: IToken[] = [
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    decimals: 8,
  },
  {
    address: '0xD31a59c85aE9D8edEFeC411D448f90841571b89c'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    name: 'Wrapped Solana',
    symbol: 'WSOL',
    decimals: 9,
  },
  {
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png',
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
  },
  {
    address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png?1696513206',
    name: 'Staked ETH',
    symbol: 'stETH',
    decimals: 18,
  },
  {
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png',
    name: 'Chainlink',
    symbol: 'LINK',
    decimals: 18,
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'.toLowerCase(),
    image: 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png',
    name: 'USDT',
    symbol: 'USDT',
    decimals: 6,
  },
]

export function getToken(address: string): IToken | undefined {
  return tokens.find((token) => token.address === address)
}

export function getAllTokensAddresses(): string[] {
  return tokens.map((token) => token.address)
}
