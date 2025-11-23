'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCrossChainStateProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChainState({ achievementId }: OnchainAchievementCrossChainStateProps) {
  const { address } = useAccount()
  const [chainId, setChainId] = useState('8453')
  const [data, setData] = useState('')
  const [txHash, setTxHash] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!chainId.trim() || !data.trim()) return
    const payload = `CrossChainState|chainId:${chainId}|data:${data}|tx:${txHash}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">CrossChainState</h3>
      <p className="text-sm text-gray-600 mb-4">Track CrossChainState operations in cross-chain protocols.</p>
      <div className="space-y-3 mb-4">
        <input type="number" value={chainId} onChange={(e) => setChainId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Chain ID" min="1" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction hash" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !chainId.trim()} className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record CrossChainState'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">✓ CrossChainState recorded onchain.</div>}
    </section>
  )
}
