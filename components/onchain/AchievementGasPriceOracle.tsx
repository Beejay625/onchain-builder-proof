'use client'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'
import { useState, useEffect } from 'react'

export default function AchievementGasPriceOracle() {
  const [gasPrice, setGasPrice] = useState('0')
  const [gasPriceGwei, setGasPriceGwei] = useState('0')

  useEffect(() => {
    // Mock gas price - in production, fetch from oracle
    setGasPrice('20000000000')
    setGasPriceGwei('20')
  }, [])

  if (!isFeatureEnabled('achievementGasPriceOracle')) {
    return null
  }

  return (
    <AppCard title="⛽ Achievement Gas Price Oracle" subtitle="Track gas price oracle operations and configurations" accent="yellow">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Gas Price" value={`${gasPriceGwei} Gwei`} accent="blue" />
          <StatBadge label="Wei" value={gasPrice} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Gas Price Oracle</p>
          <p className="text-xs">
            Real-time gas price data from oracle networks for optimal transaction timing.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

