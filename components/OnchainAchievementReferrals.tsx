'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReferralsProps {
  achievementId: bigint
}

export default function OnchainAchievementReferrals({ achievementId }: OnchainAchievementReferralsProps) {
  const { address } = useAccount()
  const [referralCode, setReferralCode] = useState('')
  const [referredAddress, setReferredAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const recordReferral = async () => {
    if (!address || !referralCode.trim() || !referredAddress.trim()) return
    
    const referralData = `REFERRAL: code: ${referralCode} | referred: ${referredAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, referralData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🧬 Referral Tracking</h3>
      
      <input
        type="text"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
        placeholder="Referral code"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={referredAddress}
        onChange={(e) => setReferredAddress(e.target.value)}
        placeholder="Referred wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={recordReferral}
        disabled={isPending || isConfirming || !referralCode.trim() || !referredAddress.trim()}
        className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Referral Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Referral recorded onchain
        </div>
      )}
    </div>
  )
}
