'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainTokenRewardsProps {
  achievementId: bigint
}

export default function OnchainTokenRewards({ achievementId }: OnchainTokenRewardsProps) {
  const { address } = useAccount()
  const [tokenAmount, setTokenAmount] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('BUILD')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const issueTokens = async () => {
    if (!address || !tokenAmount) return
    
    const tokenData = `TOKEN_REWARD: ${tokenAmount} ${tokenSymbol} for achievement #${achievementId}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, tokenData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🪙 Onchain Token Rewards</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="Token symbol"
          className="w-1/3 p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          placeholder="Amount"
          step="0.01"
          min="0"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>
      
      <button
        onClick={issueTokens}
        disabled={isPending || isConfirming || !tokenAmount}
        className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Issuing...' : `Issue ${tokenAmount || '0'} ${tokenSymbol}`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Token reward issued onchain
        </div>
      )}
    </div>
  )
}

