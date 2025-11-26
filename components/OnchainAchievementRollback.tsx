'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRollbackProps {
  achievementId: bigint
}

export default function OnchainAchievementRollback({ achievementId }: OnchainAchievementRollbackProps) {
  const { address } = useAccount()
  const [targetVersion, setTargetVersion] = useState('')
  const [rollbackReason, setRollbackReason] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const rollbackAchievement = async () => {
    if (!address || !targetVersion.trim()) return
    
    const rollbackData = `ROLLBACK:version:${targetVersion.trim()}:reason:${rollbackReason.trim() || 'no-reason'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, rollbackData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">↩️ Achievement Rollback</h3>
      
      <input
        type="text"
        value={targetVersion}
        onChange={(e) => setTargetVersion(e.target.value)}
        placeholder="Target version ID or hash"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={rollbackReason}
        onChange={(e) => setRollbackReason(e.target.value)}
        placeholder="Rollback reason (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={rollbackAchievement}
        disabled={isPending || isConfirming || !targetVersion.trim()}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Rolling back...' : 'Rollback Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Rollback initiated onchain
        </div>
      )}
    </div>
  )
}




