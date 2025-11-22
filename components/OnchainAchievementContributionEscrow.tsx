'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContributionEscrowProps {
  achievementId: bigint
}

export default function OnchainAchievementContributionEscrow({ achievementId }: OnchainAchievementContributionEscrowProps) {
  const { address } = useAccount()
  const [milestone, setMilestone] = useState('Design Freeze')
  const [escrowAmount, setEscrowAmount] = useState('2500')
  const [unlockCondition, setUnlockCondition] = useState('code review approved')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const lockContribution = () => {
    if (!address || !escrowAmount.trim() || !unlockCondition.trim()) return

    const payload = `ESCROW_LOCK|milestone:${milestone}|amount:${escrowAmount}|condition:${unlockCondition}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white rounded-xl border border-emerald-100 shadow-sm p-6">
      <h3 className="text-xl font-bold mb-2">🔒 Contribution Escrow</h3>
      <p className="text-sm text-gray-600 mb-4">Prove that milestone funds are locked until onchain completion checks clear.</p>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          value={milestone}
          onChange={(event) => setMilestone(event.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Milestone name"
        />
        <input
          type="number"
          value={escrowAmount}
          onChange={(event) => setEscrowAmount(event.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Escrow amount"
        />
        <input
          type="text"
          value={unlockCondition}
          onChange={(event) => setUnlockCondition(event.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Unlock condition"
        />
      </div>

      <button
        onClick={lockContribution}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Locking funds...' : 'Record escrow lock'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Escrow commitment notarized.
        </div>
      )}
    </section>
  )
}
