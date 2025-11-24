'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface Alert {
  mempoolTx: string
  riskScore: number
  mitigation: string
}

export default function AchievementFrontRunningAlerts() {
  const { isConnected } = useAccount()
  const [alert, setAlert] = useState<Alert | null>(null)

  if (!isFeatureEnabled('achievementFrontRunningAlerts')) {
    return null
  }

  const handleMonitor = () => {
    if (!isConnected) return
    setAlert({
      mempoolTx: '0xfeed...cafe',
      riskScore: 87,
      mitigation: 'Submit bundle via Flashbots with higher tip.',
    })
  }

  return (
    <AppCard title="🚨 Front-Running Alerts" subtitle="Monitor mempool for malicious priority transactions" accent="red">
      <div className="space-y-4">
        <button
          onClick={handleMonitor}
          disabled={!isConnected}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          Scan Mempool
        </button>
        {alert && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-900">
            <p className="font-semibold mb-1">High Risk Transaction Detected</p>
            <p className="font-mono text-xs">{alert.mempoolTx}</p>
            <p className="mt-2 text-xs">Risk Score: {alert.riskScore}/100</p>
            <p className="mt-1 text-xs">{alert.mitigation}</p>
          </div>
        )}
      </div>
    </AppCard>
  )
}

