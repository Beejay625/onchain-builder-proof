'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementVerificationProps {
  achievementId: bigint
}

export default function AchievementVerification({ achievementId }: AchievementVerificationProps) {
  const [isVerified, setIsVerified] = useState(false)

  const { data: post } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const verifyAchievement = () => {
    if (post) {
      setIsVerified(true)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✓ Achievement Verification</h3>
      
      {isVerified ? (
        <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg text-center">
          <div className="text-4xl mb-2">✓</div>
          <div className="font-bold text-green-700">Verified Onchain</div>
          <div className="text-sm text-gray-600 mt-2">
            This achievement is permanently recorded on Base blockchain
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={verifyAchievement}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Verify Achievement
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Verify this achievement exists onchain
          </p>
        </div>
      )}
    </div>
  )
}
