'use client'

import { useAccount, useBalance } from 'wagmi'

export default function OnchainAchievementAchievementWalletBalance() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Wallet Balance</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-green-600">
          {balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000'}
        </p>
        <p className="text-gray-600">ETH</p>
        <p className="text-sm text-gray-500 mt-2">
          Connected via Reown wallet
        </p>
      </div>
    </div>
  )
}

