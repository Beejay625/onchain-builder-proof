'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRenewalProps {
  achievementId: bigint
}

export default function OnchainAchievementRenewal({ achievementId }: OnchainAchievementRenewalProps) {
  const { address } = useAccount()
  const [renewalPeriod, setRenewalPeriod] = useState('30')
  const [renewalCount, setRenewalCount] = useState('0')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const renewAchievement = async () => {
    if (!address) return
    
    const renewalData = `RENEWAL:${renewalPeriod}:count:${renewalCount}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, renewalData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Achievement Renewal</h3>
      
      <input
        type="number"
        value={renewalPeriod}
        onChange={(e) => setRenewalPeriod(e.target.value)}
        placeholder="Renewal period (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={renewalCount}
        onChange={(e) => setRenewalCount(e.target.value)}
        placeholder="Renewal count"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={renewAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Renewing...' : 'Renew Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement renewed onchain
        </div>
      )}
    </div>
  )
}




