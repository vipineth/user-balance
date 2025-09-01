'use client'

import { useAccount, useConnect } from 'wagmi'
import useUserTokensInfo from '../hooks/useUserTokensInfo'
import CoinInfo from './CoinInfo'

export default function CoinList() {
  const { isConnected } = useAccount()
  const { tokensInfo, isFetching, isSuccess, error: errorMessage } = useUserTokensInfo()

  if (!isConnected) {
    return <div className="text-center text-gray-500">Connect your wallet to view your tokens</div>
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2 min-h-96">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Asset/Amount</th>
            <th className="text-right py-3 px-4 font-medium text-gray-700">Price</th>
            <th className="text-right py-3 px-4 font-medium text-gray-700">USD Value</th>
          </tr>
        </thead>
        <tbody>
          {isFetching && (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <CoinInfoSkeleton key={index} />
              ))}
            </>
          )}

          {!isFetching && !isSuccess && (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500">
                Error loading tokens
              </td>
            </tr>
          )}

          {!isFetching && isSuccess && !tokensInfo && (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500">
                No tokens found
              </td>
            </tr>
          )}
          {!isFetching && errorMessage && (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500">
                {errorMessage.message}
              </td>
            </tr>
          )}

          {!isFetching && isSuccess && tokensInfo && (
            <>
              {tokensInfo.map((coin) => (
                <CoinInfo key={coin.address} coin={coin} />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

function CoinInfoSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-gray-300"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-20 ml-auto"></div>
          <div className="h-3 bg-gray-300 rounded w-12 ml-auto"></div>
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="h-4 bg-gray-300 rounded w-24 ml-auto"></div>
      </td>
    </tr>
  )
}
