import { useQuery } from '@tanstack/react-query'
import { envConfig } from '../config/env-config'

interface IPriceData {
  usd: number
  usd_24h_change: number
}

interface ICoingeckoPricesResponse {
  [tokenAddress: string]: IPriceData
}

const COINGECKO_BASE_URL = 'https://pro-api.coingecko.com/api/v3'

async function fetchTokenPrices(tokenAddresses: string[]): Promise<ICoingeckoPricesResponse> {
  if (!tokenAddresses.length) {
    return {}
  }

  const url = `${COINGECKO_BASE_URL}/simple/token_price/ethereum`
  const params = new URLSearchParams({
    contract_addresses: tokenAddresses.join(','),
    vs_currencies: 'usd',
    include_24hr_change: 'true',
  })

  const response = await fetch(`${url}?${params}`, {
    headers: {
      accept: 'application/json',
      'x-cg-pro-api-key': envConfig.COINGECKO_API_KEY,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`,
    }))

    throw new Error(errorData.message || `Failed to fetch prices: ${response.status}`)
  }

  const data = await response.json()
  return data
}

export default function useCoingeckoData(tokenAddresses: string[]) {
  const { data, isLoading, error, isSuccess } = useQuery<ICoingeckoPricesResponse>({
    queryKey: ['coingeckoPrices', tokenAddresses.join(',')],
    queryFn: () => fetchTokenPrices(tokenAddresses),
  })

  return { data, isLoading, error, isSuccess }
}
