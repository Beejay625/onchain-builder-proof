'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGovernanceProposalProps {
  achievementId: bigint
}

export default function OnchainAchievementGovernanceProposal({ achievementId }: OnchainAchievementGovernanceProposalProps) {
  const { address } = useAccount()
  const [proposalId, setProposalId] = useState('1')
  const [data, setData] = useState('')
  const [txHash, setTxHash] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!proposalId.trim()) return
    const payload = `GovernanceProposal|id:${proposalId}|data:${data}|tx:${txHash}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">GovernanceProposal</h3>
      <p className="text-sm text-gray-600 mb-4">Track GovernanceProposal operations in DAO governance.</p>
      <div className="space-y-3 mb-4">
        <input value={proposalId} onChange={(e) => setProposalId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proposal ID" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !proposalId.trim()} className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record GovernanceProposal'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">✓ GovernanceProposal recorded onchain.</div>}
    </section>
  )
}
