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
  const [governanceAddress, setGovernanceAddress] = useState('0xgovernance')
  const [proposalId, setProposalId] = useState('1')
  const [description, setDescription] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordProposal = () => {
    if (!address) return
    if (!governanceAddress.trim()) return
    if (!governanceAddress.startsWith('0x') || governanceAddress.length !== 42) return

    const payload = `GOVERNANCE_PROPOSALS|governance:${governanceAddress}|proposalId:${proposalId}|description:${description}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-amber-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🗳️ Governance Proposals</h3>
      <p className="text-sm text-gray-600 mb-4">Record governance proposal submissions and details.</p>

      <div className="space-y-3 mb-4">
        <input value={governanceAddress} onChange={(e) => setGovernanceAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500" placeholder="Governance contract address" />
        <input type="number" value={proposalId} onChange={(e) => setProposalId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proposal ID" min="0" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Description" />
      </div>

      <button
        onClick={recordProposal}
        disabled={isPending || isConfirming || !address || !governanceAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record governance proposal'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ✓ Governance proposal recorded onchain.
        </div>
      )}
    </section>
  )
}
