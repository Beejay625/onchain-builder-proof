'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTokenGatingProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenGating({ achievementId }: OnchainAchievementTokenGatingProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')
  const [minBalance, setMinBalance] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setTokenGate = async () => {
    if (!address || !tokenAddress.trim()) return
    
    const gateData = `TOKEN_GATE: ${tokenAddress}${minBalance ? ` | min: ${minBalance}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, gateData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔑 Token Gating</h3>
      
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Token contract address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <input
        type="number"
        value={minBalance}
        onChange={(e) => setMinBalance(e.target.value)}
        placeholder="Minimum balance (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={setTokenGate}
        disabled={isPending || isConfirming || !tokenAddress.trim()}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set Token Gate Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Token gate configured onchain
        </div>
      )}
    </div>
  )
}
