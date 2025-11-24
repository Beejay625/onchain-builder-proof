'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementBridgeFeeEstimator() {
  const { isConnected } = useAccount()
  const [amount, setAmount] = useState('1.0')
  const [fromChain, setFromChain] = useState('Base')
  const [toChain, setToChain] = useState('Ethereum')
  const [feeQuote, setFeeQuote] = useState<string | null>(null)

  if (!isFeatureEnabled('achievementBridgeFeeEstimator')) {
    return null
  }

  const handleEstimate = () => {
    if (!isConnected || !amount.trim()) return
    const fee = (Number(amount) * 0.0025).toFixed(4)
    setFeeQuote(`${fee} ETH`)
  }

  return (
    <AppCard title="🌉 Bridge Fee Estimator" subtitle="Forecast bridge fees before syncing achievements cross-chain" accent="emerald">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Chain</label>
            <input
              type="text"
              value={fromChain}
              onChange={(e) => setFromChain(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Chain</label>
            <input
              type="text"
              value={toChain}
              onChange={(e) => setToChain(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ETH)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleEstimate}
          disabled={!isConnected || !amount.trim()}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
        >
          Estimate Fees
        </button>
        {feeQuote && (
          <div className="grid grid-cols-2 gap-4">
            <StatBadge label="Route" value={`${fromChain} → ${toChain}`} accent="emerald" />
            <StatBadge label="Estimated Fee" value={feeQuote} accent="green" />
          </div>
        )}
      </div>
    </AppCard>
  )
}

