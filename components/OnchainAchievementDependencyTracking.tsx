'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDependencyTrackingProps {
  achievementId: bigint
}

export default function OnchainAchievementDependencyTracking({ achievementId }: OnchainAchievementDependencyTrackingProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [tool, setTool] = useState('')
  const [result, setResult] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim() || !contractAddress.startsWith('0x')) return
    const payload = `DependencyTracking|contract:${contractAddress}|tool:${tool}|result:${result}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">DependencyTracking</h3>
      <p className="text-sm text-gray-600 mb-4">Track DependencyTracking operations and analysis results.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={tool} onChange={(e) => setTool(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Tool" />
        <input value={result} onChange={(e) => setResult(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Result" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record DependencyTracking'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">✓ DependencyTracking recorded onchain.</div>}
    </section>
  )
}
