'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSnapshotProps {
  achievementId: bigint
}

export default function OnchainAchievementSnapshot({ achievementId }: OnchainAchievementSnapshotProps) {
  const { address } = useAccount()
  const [snapshotName, setSnapshotName] = useState('')
  const [snapshotDescription, setSnapshotDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createSnapshot = async () => {
    if (!address) return
    
    const snapshotData = `SNAPSHOT:name:${snapshotName.trim() || 'unnamed'}:desc:${snapshotDescription.trim() || 'no-desc'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, snapshotData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📸 Achievement Snapshot</h3>
      
      <input
        type="text"
        value={snapshotName}
        onChange={(e) => setSnapshotName(e.target.value)}
        placeholder="Snapshot name (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={snapshotDescription}
        onChange={(e) => setSnapshotDescription(e.target.value)}
        placeholder="Snapshot description (optional)"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createSnapshot}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Snapshot Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Snapshot created onchain
        </div>
      )}
    </div>
  )
}

