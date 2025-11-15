'use client'

import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface OnchainReputationProps {
  userAddress: string
}

export default function OnchainReputation({ userAddress }: OnchainReputationProps) {
  const { data: reputation, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getReputation',
    args: [userAddress as `0x${string}`],
  })

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">⭐ Onchain Reputation</h3>
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {reputation ? reputation.toString() : '0'}
          </div>
          <p className="text-sm text-gray-600">Reputation Score</p>
          <p className="text-xs text-gray-500 mt-2">
            Calculated from achievements, likes, and comments
          </p>
        </div>
      )}
    </div>
  )
}
