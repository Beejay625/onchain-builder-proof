'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMetadataStorage() {
  const { address } = useAccount()
  const [metadata, setMetadata] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const storeMetadata = async () => {
    if (!address || !metadata) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `METADATA: ${metadata}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Metadata Storage</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Enter metadata JSON"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <button
          onClick={storeMetadata}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Storing...' : 'Store Metadata'}
        </button>
        {isSuccess && <p className="text-green-600">Metadata stored onchain!</p>}
      </div>
    </div>
  )
}

