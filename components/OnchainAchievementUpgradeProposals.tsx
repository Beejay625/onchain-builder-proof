'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementUpgradeProposalsProps {
  achievementId: bigint
}

export default function OnchainAchievementUpgradeProposals({ achievementId }: OnchainAchievementUpgradeProposalsProps) {
  const { address } = useAccount()
  const [proposalId, setProposalId] = useState('UP-001')
  const [targetVersion, setTargetVersion] = useState('v2.0.0')
  const [upgradeType, setUpgradeType] = useState('transparent proxy')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitProposal = () => {
    if (!address || !proposalId.trim()) return

    const payload = `UPGRADE_PROPOSAL|id:${proposalId}|version:${targetVersion}|type:${upgradeType}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⬆️ Upgrade Proposals</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract upgrade proposals with version tracking.</p>

      <div className="space-y-3 mb-4">
        <input value={proposalId} onChange={(e) => setProposalId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proposal ID" />
        <input value={targetVersion} onChange={(e) => setTargetVersion(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Target version" />
        <input value={upgradeType} onChange={(e) => setUpgradeType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Upgrade type" />
      </div>

      <button
        onClick={submitProposal}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Submitting...' : 'Submit upgrade proposal'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Upgrade proposal recorded onchain.
        </div>
      )}
    </section>
  )
}
