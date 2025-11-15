'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface ReputationWeightingProps {
  voterAddress: string
}

export default function ReputationWeighting({ voterAddress }: ReputationWeightingProps) {
  const { data: reputation, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getReputation',
    args: [voterAddress as `0x${string}`],
  })

  const calculateWeight = (rep: bigint) => {
    const repNum = Number(rep)
    if (repNum < 100) return 1
    if (repNum < 500) return 2
    if (repNum < 1000) return 3
    return 5
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Reputation Weight</h3>
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Reputation</div>
            <div className="text-2xl font-bold text-blue-600">
              {reputation ? reputation.toString() : '0'}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Vote Weight</div>
            <div className="text-2xl font-bold text-green-600">
              {reputation ? calculateWeight(reputation) : 1}x
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
