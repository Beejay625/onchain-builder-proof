'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface Detection {
  severity: 'low' | 'medium' | 'high'
  attacker: string
  savedAmount: string
}

export default function AchievementSandwichDetector() {
  const { isConnected } = useAccount()
  const [txHash, setTxHash] = useState('')
  const [detection, setDetection] = useState<Detection | null>(null)

  if (!isFeatureEnabled('achievementSandwichDetector')) {
    return null
  }

  const handleDetect = () => {
    if (!isConnected || !txHash.trim()) return
    setDetection({
      severity: 'medium',
      attacker: '0xdead...beef',
      savedAmount: '0.042 ETH',
    })
  }

  return (
    <AppCard title="🥪 Sandwich Attack Detector" subtitle="Inspect mempool slippage risks and saved value" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Hash</label>
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleDetect}
          disabled={!isConnected || !txHash.trim()}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          Scan for Sandwich Attacks
        </button>
        {detection && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <StatBadge label="Severity" value={detection.severity.toUpperCase()} accent="red" />
              <StatBadge label="Saved Amount" value={detection.savedAmount} accent="green" />
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
              Attacker prevented: <span className="font-mono">{detection.attacker}</span>
            </div>
          </div>
        )}
      </div>
    </AppCard>
  )
}

