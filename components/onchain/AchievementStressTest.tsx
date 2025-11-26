'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementStressTestProps {
  achievementId: bigint
}

export default function AchievementStressTest({ achievementId }: AchievementStressTestProps) {
  const { address, isConnected } = useAccount()
  const [testScenario, setTestScenario] = useState('')
  const [loadLevel, setLoadLevel] = useState('')
  const [result, setResult] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementStressTest')) {
    return null
  }

  const handleRecordStressTest = async () => {
    if (!isConnected || !address || !testScenario.trim() || !loadLevel.trim()) return

    try {
      const content = `Stress Test\nAchievement: #${achievementId.toString()}\nScenario: ${testScenario}\nLoad: ${loadLevel}\nResult: ${result || 'N/A'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Stress test recording failed:', error)
    }
  }

  return (
    <AppCard title="💪 Stress Test" subtitle="Record stress test scenarios and performance under load" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Scenario</label>
          <input
            type="text"
            value={testScenario}
            onChange={(e) => setTestScenario(e.target.value)}
            placeholder="10x normal traffic spike"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Load Level</label>
          <input
            type="text"
            value={loadLevel}
            onChange={(e) => setLoadLevel(e.target.value)}
            placeholder="1000 TPS"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="System handled load successfully..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <button
          onClick={handleRecordStressTest}
          disabled={isPending || isConfirming || !isConnected || !testScenario.trim() || !loadLevel.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Stress Test'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Stress test recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

