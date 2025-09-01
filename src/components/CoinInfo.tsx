import { ITokenInfo } from '../hooks/useUserTokensInfo'
import { cn } from '../lib/classnames'
import { formatAmount, formatUSD } from '../lib/format'
import { limitDecimals } from '../lib/numbers'
import Image from 'next/image'

interface IProps {
  coin: ITokenInfo
}

export default function CoinInfo({ coin }: IProps) {
  return (
    <tr className="bg-blue-50 shadow-sm border border-gray-100">
      <td className="py-4 px-4 rounded-l-md">
        <div className="flex items-center gap-3">
          <img className="size-8 rounded-full" src={coin.image} alt={coin.symbol} />
          <div>
            <p className="font-medium text-gray-900">
              {formatAmount(coin.tokenBalanceAmount, 4)} {coin.symbol}
            </p>
            <p className="text-sm text-gray-500">{coin.name}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <p className="font-medium text-gray-900">{formatUSD(coin.usd)}</p>
        <p className={cn(coin.usd_24h_change > 0 ? 'text-green-500' : 'text-red-500', 'text-sm')}>
          {coin.usd_24h_change > 0 ? '+' : ''}
          {limitDecimals(coin.usd_24h_change, 2)}%
        </p>
      </td>
      <td className="py-4 px-4 text-right rounded-r-md">
        <p className="font-semibold text-gray-900">{formatUSD(coin.tokenBalanceUsdValue)}</p>
      </td>
    </tr>
  )
}
