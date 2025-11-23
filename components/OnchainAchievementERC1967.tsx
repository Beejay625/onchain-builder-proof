'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementERC1967Props {
  achievementId: bigint
}

export default function OnchainAchievementERC1967({ achievementId }: OnchainAchievementERC1967Props) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [standard, setStandard] = useState('ERC1967')
  const [implementation, setImplementation] = useState('standard')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim() || !contractAddress.startsWith('0x')) return
    const payload = `ERC1967|contract:${contractAddress}|standard:${standard}|impl:${implementation}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">ERC1967</h3>
      <p className="text-sm text-gray-600 mb-4">Track ERC1967 token standard implementations.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={standard} onChange={(e) => setStandard(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Standard" />
        <input value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Implementation" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record ERC1967'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">✓ ERC1967 implementation recorded.</div>}
    </section>
  )
}
