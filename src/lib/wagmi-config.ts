import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

function getConfig() {
  return createConfig({
    chains: [mainnet],
    connectors: [injected()],
    ssr: true,
    transports: {
      [mainnet.id]: http('https://eth.llamarpc.com'),
    },
  })
}

export const config = getConfig()
