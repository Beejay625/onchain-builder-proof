'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementStreamingProps {
  achievementId: bigint
}

export default function OnchainAchievementStreaming({ achievementId }: OnchainAchievementStreamingProps) {
  const { address } = useAccount()
  const [streamAmount, setStreamAmount] = useState('')
  const [streamDuration, setStreamDuration] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const startStreaming = async () => {
    if (!address || !streamAmount.trim() || !streamDuration.trim() || !recipientAddress.trim()) return
    
    const streamData = `STREAMING: ${streamAmount} ETH | duration: ${streamDuration} days | recipient: ${recipientAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, streamData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📡 Streaming Rewards</h3>
      
      <input
        type="number"
        value={streamAmount}
        onChange={(e) => setStreamAmount(e.target.value)}
        placeholder="Total stream amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={streamDuration}
        onChange={(e) => setStreamDuration(e.target.value)}
        placeholder="Stream duration (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Recipient wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={startStreaming}
        disabled={isPending || isConfirming || !streamAmount.trim() || !streamDuration.trim() || !recipientAddress.trim()}
        className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Starting...' : 'Start Streaming Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Streaming started onchain
        </div>
      )}
    </div>
  )
}


