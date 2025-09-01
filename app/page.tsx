import CoinList from '@/src/components/CoinList'
import ConnectWallet from '@/src/components/ConnectWallet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex justify-center items-center">
      <main className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-end gap-4 w-full p-2">
          <ConnectWallet />
        </div>

        <div className="py-2">
          <CoinList />
        </div>
      </main>
    </div>
  )
}
