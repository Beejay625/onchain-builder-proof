'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGovernanceProposalsProps {
  achievementId: bigint
}

export default function OnchainAchievementGovernanceProposals({ achievementId }: OnchainAchievementGovernanceProposalsProps) {
  const { address } = useAccount()
  const [proposalType, setProposalType] = useState('funding')
  const [amount, setAmount] = useState('5000 USDC')
  const [votingDeadline, setVotingDeadline] = useState('2024-07-15T00:00:00Z')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitProposal = () => {
    if (!address || !proposalType.trim()) return

    const payload = `GOV_PROPOSAL|type:${proposalType}|amount:${amount}|deadline:${votingDeadline}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🗳️ Governance Proposals</h3>
      <p className="text-sm text-gray-600 mb-4">Attach governance proposals directly to achievement threads for transparent decision-making.</p>

      <div className="space-y-3 mb-4">
        <input value={proposalType} onChange={(e) => setProposalType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proposal type" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={votingDeadline} onChange={(e) => setVotingDeadline(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Voting deadline" />
      </div>

      <button
        onClick={submitProposal}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Submitting proposal...' : 'Submit governance proposal'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Governance proposal linked to achievement.
        </div>
      )}
    </section>
  )
}
