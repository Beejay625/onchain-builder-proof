'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface SimulationResult {
  success: boolean
  gasUsed: number
  notes: string
}

export default function AchievementTxSimulation() {
  const { isConnected } = useAccount()
  const [simulationScenario, setSimulationScenario] = useState('Mint achievement with batching and cross-chain sync.')
  const [result, setResult] = useState<SimulationResult | null>(null)

  if (!isFeatureEnabled('achievementTxSimulation')) {
    return null
  }

  const handleSimulate = () => {
    if (!isConnected || !simulationScenario.trim()) return
    // mock deterministic result
    const mockResult: SimulationResult = {
      success: true,
      gasUsed: 182000,
      notes: 'No reverts encountered. Bundle eligible for private mempool submission.',
    }
    setResult(mockResult)
  }

  return (
    <AppCard
      title="🧪 Transaction Simulation"
      subtitle="Dry-run complex achievement mints before committing onchain"
      accent="indigo"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Simulation Scenario</label>
          <textarea
            value={simulationScenario}
            onChange={(e) => setSimulationScenario(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSimulate}
          disabled={!isConnected || !simulationScenario.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Simulate Transaction
        </button>
        {result && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <StatBadge label="Status" value={result.success ? 'Pass' : 'Fail'} accent={result.success ? 'green' : 'red'} />
              <StatBadge label="Gas Used" value={`${result.gasUsed.toLocaleString()} units`} accent="purple" />
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{result.notes}</div>
          </div>
        )}
      </div>
    </AppCard>
  )
}

