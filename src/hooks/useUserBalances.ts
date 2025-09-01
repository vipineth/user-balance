import { useAccount, useBalance, useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'
import { config } from '../lib/wagmi-config'
import { getAllTokensAddresses } from '../config/tokens'

interface IBalanceResult {
  result: bigint
  status: 'success' | 'failure'
}

interface IReturnData {
  [tokenAddress: string]: IBalanceResult
}

const tokensAddresses = getAllTokensAddresses()

export default function useUserBalances() {
  const { address } = useAccount()
  const {
    data: ethBalance,
    isLoading: isLoadingBalance,
    error: errorBalance,
    isSuccess: isSuccessBalance,
  } = useBalance({
    address: address,
  })

  const { data, isLoading, error, isSuccess } = useReadContracts({
    contracts: tokensAddresses.map((tokenAddress) => ({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
      chainId: config.chains[0].id,
    })),
    query: {
      enabled: !!address,
    },
  })

  const transformedData = data?.reduce(
    (acc, item, index) => ({
      ...acc,
      [tokensAddresses[index]]: item as IBalanceResult,
    }),
    {} as IReturnData,
  )

  return {
    data: transformedData,
    isLoading: isLoadingBalance || isLoading,
    error: errorBalance || error,
    isSuccess: isSuccessBalance || isSuccess,
    ethBalance,
  }
}
