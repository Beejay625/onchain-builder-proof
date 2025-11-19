'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTreasuryProps {
  achievementId: bigint
}

export default function OnchainAchievementTreasury({ achievementId }: OnchainAchievementTreasuryProps) {
  const { address } = useAccount()
  const [contributionAmount, setContributionAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const contributeToTreasury = async () => {
    if (!address || !contributionAmount.trim()) return
    
    const treasuryData = `TREASURY_CONTRIBUTION: ${contributionAmount} ETH`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, treasuryData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏦 Treasury Contribution</h3>
      
      <input
        type="number"
        value={contributionAmount}
        onChange={(e) => setContributionAmount(e.target.value)}
        placeholder="Contribution amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={contributeToTreasury}
        disabled={isPending || isConfirming || !contributionAmount.trim()}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Contributing...' : 'Contribute to Treasury Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Treasury contribution recorded onchain
        </div>
      )}
    </div>
  )
}
