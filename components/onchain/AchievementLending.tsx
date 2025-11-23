'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementLendingProps {
  achievementId: bigint
}

export default function AchievementLending({ achievementId }: AchievementLendingProps) {
  const { address, isConnected } = useAccount()
  const [borrowerAddress, setBorrowerAddress] = useState('')
  const [lendingDuration, setLendingDuration] = useState(30)
  const [lendingTerms, setLendingTerms] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainLending')) {
    return null
  }

  const handleLend = async () => {
    if (!isConnected || !address || !borrowerAddress) return

    try {
      const endDate = new Date(Date.now() + lendingDuration * 24 * 60 * 60 * 1000)
      const content = `Achievement Lending\nAchievement: #${achievementId.toString()}\nBorrower: ${borrowerAddress}\nDuration: ${lendingDuration} days\nEnds: ${endDate.toISOString()}${lendingTerms ? `\nTerms: ${lendingTerms}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Lending failed:', error)
    }
  }

  return (
    <AppCard title="📚 Achievement Lending" subtitle="Lend achievements to other builders" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Borrower Address</label>
          <input
            type="text"
            value={borrowerAddress}
            onChange={(e) => setBorrowerAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lending Duration (days)</label>
          <input
            type="number"
            value={lendingDuration}
            onChange={(e) => setLendingDuration(Number(e.target.value))}
            min={1}
            max={365}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Terms (optional)</label>
          <textarea
            value={lendingTerms}
            onChange={(e) => setLendingTerms(e.target.value)}
            placeholder="Lending terms and conditions..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleLend}
          disabled={isPending || isConfirming || !isConnected || !borrowerAddress}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Lending...' : 'Lend Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Lending agreement recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

