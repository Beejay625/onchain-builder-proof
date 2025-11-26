'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementDAOProposalLinkProps {
  achievementId: bigint
}

export default function OnchainAchievementDAOProposalLink({ achievementId }: OnchainAchievementDAOProposalLinkProps) {
  const { address, isConnected } = useAccount()
  const [daoName, setDaoName] = useState('')
  const [proposalUrl, setProposalUrl] = useState('')
  const [proposalStatus, setProposalStatus] = useState<'draft' | 'active' | 'passed' | 'failed'>('draft')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const attachProposal = async () => {
    if (!isConnected || !address || !daoName.trim() || !proposalUrl.trim()) return

    try {
      const payload = `DAO_PROPOSAL:dao:${daoName}:proposal:${proposalUrl}:status:${proposalStatus}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('DAO proposal link failed:', error)
    }
  }

  return (
    <AppCard title="🗳 DAO Proposal" subtitle="Link DAO proposals tied to this proof" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">DAO Name *</label>
          <input
            type="text"
            value={daoName}
            onChange={(e) => setDaoName(e.target.value)}
            placeholder="BuilderDAO, Optimism, Base Guild"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Link *</label>
          <input
            type="text"
            value={proposalUrl}
            onChange={(e) => setProposalUrl(e.target.value)}
            placeholder="gov.optimism.io/proposals/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={proposalStatus}
            onChange={(e) => setProposalStatus(e.target.value as typeof proposalStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <button
          onClick={attachProposal}
          disabled={isPending || isConfirming || !isConnected || !daoName.trim() || !proposalUrl.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Attaching...' : 'Attach DAO Proposal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ DAO proposal linked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
