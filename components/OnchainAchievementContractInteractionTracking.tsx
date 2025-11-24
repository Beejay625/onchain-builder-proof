'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContractInteractionTrackingProps {
  achievementId: bigint
}

export default function OnchainAchievementContractInteractionTracking({ achievementId }: OnchainAchievementContractInteractionTrackingProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [functionName, setFunctionName] = useState('')
  const [gasUsed, setGasUsed] = useState('21000')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return
    const payload = `ContractInteractionTracking|contract:${contractAddress}|function:${functionName}|gas:${gasUsed}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">ContractInteractionTracking</h3>
      <p className="text-sm text-gray-600 mb-4">Track ContractInteractionTracking operations and metrics.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={functionName} onChange={(e) => setFunctionName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Function name" />
        <input value={gasUsed} onChange={(e) => setGasUsed(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Gas used" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record ContractInteractionTracking'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">✓ ContractInteractionTracking recorded onchain.</div>}
    </section>
  )
}
