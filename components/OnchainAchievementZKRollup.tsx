'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementZKRollupProps {
  achievementId: bigint
}

export default function OnchainAchievementZKRollup({ achievementId }: OnchainAchievementZKRollupProps) {
  const { address } = useAccount()
  const [l2Chain, setL2Chain] = useState('Optimism')
  const [bridgeAddress, setBridgeAddress] = useState('0xbridge')
  const [batchSize, setBatchSize] = useState('100')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!bridgeAddress.trim() || !bridgeAddress.startsWith('0x')) return
    const payload = `ZKRollup|chain:${l2Chain}|bridge:${bridgeAddress}|batch:${batchSize}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">ZKRollup</h3>
      <p className="text-sm text-gray-600 mb-4">Track ZKRollup scaling solution implementations.</p>
      <div className="space-y-3 mb-4">
        <input value={l2Chain} onChange={(e) => setL2Chain(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="L2 Chain" />
        <input value={bridgeAddress} onChange={(e) => setBridgeAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Bridge address" />
        <input value={batchSize} onChange={(e) => setBatchSize(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Batch size" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !bridgeAddress.startsWith('0x')} className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record ZKRollup'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">✓ ZKRollup configuration recorded.</div>}
    </section>
  )
}
