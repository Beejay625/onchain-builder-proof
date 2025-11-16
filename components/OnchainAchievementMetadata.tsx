'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMetadata() {
  const { address } = useAccount()
  const [metadata, setMetadata] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addMetadata = async () => {
    if (!address || !metadata) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`METADATA: ${metadata}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Achievement Metadata</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Metadata JSON"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={addMetadata}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add Metadata'}
        </button>
        {isSuccess && <p className="text-green-600">Metadata added onchain!</p>}
      </div>
    </div>
  )
}
