import { createConfig, fallback, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

function getConfig() {
  return createConfig({
    chains: [mainnet],
    connectors: [injected()],
    ssr: true,
    transports: {
      [mainnet.id]: fallback([
        http('https://eth-mainnet.public.blastapi.io'),
        http('https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7'),
        http('https://eth.rpc.blxrbdn.com'),
      ]),
    },
  })
}

export const config = getConfig()
