'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTransferProps {
  achievementId: bigint
}

export default function OnchainAchievementTransfer({ achievementId }: OnchainAchievementTransferProps) {
  const { address } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const transferAchievement = async () => {
    if (!address || !recipientAddress.trim()) return
    
    const transferData = `TRANSFER: ${recipientAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, transferData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Onchain Transfer</h3>
      
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Recipient wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={transferAchievement}
        disabled={isPending || isConfirming || !recipientAddress.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Transferring...' : 'Transfer Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Transfer recorded onchain
        </div>
      )}
    </div>
  )
}

