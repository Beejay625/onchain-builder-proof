'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContractRegistryProps {
  achievementId: bigint
}

export default function OnchainAchievementContractRegistry({ achievementId }: OnchainAchievementContractRegistryProps) {
  const { address } = useAccount()
  const [registryAddress, setRegistryAddress] = useState('0xregistry')
  const [entry, setEntry] = useState('')
  const [data, setData] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!registryAddress.trim()) return
    if (!registryAddress.startsWith('0x') || registryAddress.length !== 42) return
    const payload = `ContractRegistry|registry:${registryAddress}|entry:${entry}|data:${data}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">ContractRegistry</h3>
      <p className="text-sm text-gray-600 mb-4">Track ContractRegistry operations and registry entries.</p>
      <div className="space-y-3 mb-4">
        <input value={registryAddress} onChange={(e) => setRegistryAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Registry address" />
        <input value={entry} onChange={(e) => setEntry(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Entry" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !registryAddress.startsWith('0x')} className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record ContractRegistry'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">✓ ContractRegistry recorded onchain.</div>}
    </section>
  )
}
