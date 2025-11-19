'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCrossChainProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChain({ achievementId }: OnchainAchievementCrossChainProps) {
  const { address } = useAccount()
  const [targetChain, setTargetChain] = useState('arbitrum')
  const [bridgeAmount, setBridgeAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const bridgeAchievement = async () => {
    if (!address) return
    
    const bridgeData = `CROSS_CHAIN_BRIDGE: ${targetChain}${bridgeAmount ? ` | amount: ${bridgeAmount}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, bridgeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌉 Cross-Chain Bridge</h3>
      
      <select
        value={targetChain}
        onChange={(e) => setTargetChain(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="arbitrum">Arbitrum</option>
        <option value="optimism">Optimism</option>
        <option value="polygon">Polygon</option>
        <option value="ethereum">Ethereum Mainnet</option>
      </select>
      
      <input
        type="number"
        value={bridgeAmount}
        onChange={(e) => setBridgeAmount(e.target.value)}
        placeholder="Bridge amount (optional)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={bridgeAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Bridging...' : 'Bridge to ' + targetChain + ' Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Cross-chain bridge initiated onchain
        </div>
      )}
    </div>
  )
}
