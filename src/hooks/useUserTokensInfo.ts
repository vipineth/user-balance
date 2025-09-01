import { useMemo } from 'react'
import { formatUnits } from 'viem'
import useUserBalances from './useUserBalances'
import { ETH_TOKEN, getToken } from '../config/tokens'
import { getAllTokensAddresses } from '../config/tokens'
import useCoingeckoData from './useCoingeckoData'

export interface ITokenInfo {
  address: string
  image: string
  name: string
  symbol: string
  decimals: number
  usd: number
  usd_24h_change: number
  balance: bigint
  tokenBalanceAmount: number
  tokenBalanceUsdValue: number
}

const tokensAddresses = getAllTokensAddresses()

export default function useUserTokensInfo() {
  const {
    data: userBalances,
    isLoading: isLoadingBalances,
    isSuccess: isSuccessBalances,
    error: errorBalances,
    ethBalance,
  } = useUserBalances()
  const {
    data: coingeckoData,
    isLoading: isLoadingPrices,
    error: errorPrices,
    isSuccess: isSuccessPrices,
  } = useCoingeckoData(tokensAddresses)

  const isLoading = isLoadingBalances || isLoadingPrices
  const isSuccess = isSuccessBalances && isSuccessPrices

  const tokensInfo = useMemo((): ITokenInfo[] | null => {
    if (!userBalances || !coingeckoData) {
      return null
    }

    return tokensAddresses.map((tokenAddress) => {
      const lowercaseTokenAddress = tokenAddress.toLowerCase()
      const tokenInfo = getToken(lowercaseTokenAddress)!
      const balanceData = userBalances[lowercaseTokenAddress]
      const congeckoResponse = coingeckoData[lowercaseTokenAddress]

      const balance = balanceData.result
      const tokenBalanceAmount = Number(formatUnits(balance, tokenInfo?.decimals))
      const tokenBalanceUsdValue = tokenBalanceAmount * congeckoResponse.usd

      return {
        ...tokenInfo,
        ...congeckoResponse,
        balance,
        tokenBalanceAmount,
        tokenBalanceUsdValue,
      }
    })
  }, [userBalances, coingeckoData, isSuccess])

  const ethTokenInfo = useMemo(() => {
    if (!ethBalance || !coingeckoData) {
      return null
    }
    const coingeckoEthData = coingeckoData[ETH_TOKEN?.priceFallBackTokenAddress!]
    const ethBalanceAmount = formatUnits(ethBalance.value, ETH_TOKEN.decimals)
    return {
      ...ETH_TOKEN,
      ...coingeckoEthData,
      balance: Number(ethBalance.value),
      tokenBalanceAmount: ethBalanceAmount,
      tokenBalanceUsdValue: Number(ethBalanceAmount) * coingeckoEthData.usd,
    }
  }, [ethBalance])

  const finalTokensInfo = useMemo(() => {
    if (!ethTokenInfo || !tokensInfo) {
      return null
    }
    return [ethTokenInfo, ...tokensInfo].filter((token) => token !== null) as ITokenInfo[]
  }, [ethTokenInfo, tokensInfo])

  return {
    tokensInfo: finalTokensInfo,
    isFetching: isLoading,
    isSuccess,
    isLoading,
    error: errorBalances || errorPrices,
  }
}
