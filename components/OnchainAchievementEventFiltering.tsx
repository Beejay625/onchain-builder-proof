'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEventFilteringProps {
  achievementId: bigint
}

export default function OnchainAchievementEventFiltering({ achievementId }: OnchainAchievementEventFilteringProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [version, setVersion] = useState('1.0.0')
  const [data, setData] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim() || !contractAddress.startsWith('0x')) return
    const payload = `EventFiltering|contract:${contractAddress}|version:${version}|data:${data}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">EventFiltering</h3>
      <p className="text-sm text-gray-600 mb-4">Track EventFiltering operations and state changes.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={version} onChange={(e) => setVersion(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Version" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record EventFiltering'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">✓ EventFiltering recorded onchain.</div>}
    </section>
  )
}
