'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { formatNumber } from '@/lib/utils'

export default function OnchainContributionTracking() {
  const { address } = useAccount()
  const [contributions, setContributions] = useState<any[]>([])
  
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (userPosts) {
      setContributions(Array.from(userPosts as bigint[]))
    }
  }, [userPosts])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Contribution Tracking</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Your Contributions</p>
            <p className="text-2xl font-bold">{contributions.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Platform</p>
            <p className="text-2xl font-bold">{totalPosts ? formatNumber(Number(totalPosts)) : '0'}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Recent Contributions</h3>
          <div className="space-y-2">
            {contributions.slice(0, 5).map((id, idx) => (
              <div key={idx} className="p-2 bg-gray-50 rounded">
                Contribution #{id.toString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

