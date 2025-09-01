'use client'

import { useAccount, useBalance, useConnect } from 'wagmi'
import useUserTokensInfo, { ITokenInfo } from '../hooks/useUserTokensInfo'
import { useMemo } from 'react'
import CoinInfo from './CoinInfo'
import Coin from './Coin'
import { formatUSD } from '../lib/format'

const MIN_BALANCE_THRESHOLD_USD = 0.1

export default function CoinList() {
  const { address } = useAccount()
  const { isConnected } = useAccount()
  const { tokensInfo, isFetching, isSuccess, error: errorMessage } = useUserTokensInfo()
  const balance = useBalance({
    address: address,
  })

  const { highValueTokens, lowValueTokens, combinedLowValueTokensValue } = useMemo(() => {
    if (!tokensInfo) {
      return { highValueTokens: null, lowValueTokens: null, combinedLowValueTokensValue: null }
    }
    const highValueTokens = tokensInfo?.filter((token) => token.tokenBalanceUsdValue >= MIN_BALANCE_THRESHOLD_USD)
    const smallAmountTokens = tokensInfo?.filter((token) => token.tokenBalanceUsdValue < MIN_BALANCE_THRESHOLD_USD)
    const combinedSmallTokensValue = smallAmountTokens?.reduce((acc, token) => acc + token.tokenBalanceUsdValue, 0)
    return {
      highValueTokens,
      lowValueTokens: smallAmountTokens,
      combinedLowValueTokensValue: combinedSmallTokensValue,
    } as const
  }, [tokensInfo])

  if (!isConnected) {
    return <div className="text-center text-gray-500">Connect your wallet to view your tokens</div>
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
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

          {!isFetching && errorMessage && (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500">
                {errorMessage.message}
              </td>
            </tr>
          )}

          {highValueTokens?.map((token) => (
            <CoinInfo key={token.address} coin={token} />
          ))}

          {lowValueTokens && lowValueTokens.length > 0 && (
            <tr className="bg-blue-50 shadow-sm border border-gray-100">
              <td className="py-4 px-4 rounded-l-md">
                <div className="flex items-center gap-3">
                  <Coin />
                  <div>
                    <p className="font-medium text-gray-900">{lowValueTokens.length} low value tokens</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 rounded-l-md"></td>
              <td className="py-4 px-4 rounded-l-md text-right">
                <p className="text-sm text-gray-500 text-right font-semibold text-gray-900">
                  {formatUSD(combinedLowValueTokensValue)}
                </p>
              </td>
            </tr>
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
