'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface ContributionTrackingProps {
  userAddress: string
}

export default function ContributionTracking({ userAddress }: ContributionTrackingProps) {
  const { data: contributions, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getContributions',
    args: [userAddress as `0x${string}`],
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Contribution Tracking</h3>
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Total Contributions</div>
            <div className="text-2xl font-bold text-blue-600">
              {contributions ? contributions.toString() : '0'}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Track all contributions across the platform
          </div>
        </div>
      )}
    </div>
  )
}
