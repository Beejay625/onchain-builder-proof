'use client'

import { useBalance } from 'wagmi'
import { formatEthAmount } from '@/lib/utils'

interface WalletBalanceProps {
  address?: `0x${string}`
}

export default function WalletBalance({ address }: WalletBalanceProps) {
  const { data: balance, isLoading } = useBalance({
    address,
  })

  if (!address) return null

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">💰 Wallet Balance</span>
        {isLoading ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : (
          <span className="text-lg font-bold text-green-700">
            {balance ? formatEthAmount(balance.value) : '0 ETH'}
          </span>
        )}
      </div>
    </div>
  )
}
