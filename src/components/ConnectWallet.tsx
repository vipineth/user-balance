'use client'

import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi'
import { shortenAddress } from '../lib/address'
import { Button } from './Button'

export default function ConnectWallet() {
  const { connect, connectors, error: connectError, isPending, reset } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  const getButtonText = () => {
    if (isConnected) {
      return `${shortenAddress(address || '')} Disconnect`
    }
    return isPending ? 'Connecting...' : 'Connect Wallet'
  }

  function handleButtonClick() {
    if (isConnected) {
      disconnect()
    } else {
      connect({ connector: connectors[0], chainId })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <Button onClick={handleButtonClick} disabled={isPending}>
          {getButtonText()}
        </Button>
      </div>

      {connectError && !isConnected && (
        <div className="mt-2 max-w-md p-3 bg-white border border-black rounded-lg">
          <p className="text-black text-xs font-medium">Connection Failed</p>
          <p className="text-gray-600 text-xs mt-1">
            {connectError.message || 'Failed to connect to wallet. Please try again.'}
          </p>
        </div>
      )}
    </div>
  )
}
