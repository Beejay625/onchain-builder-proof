'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementCalendar() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Achievement Calendar</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-blue-600">{userPosts?.length || 0}</p>
        <p className="text-gray-600">Calendar entries</p>
        <p className="text-sm text-gray-500 mt-2">
          View by date
        </p>
      </div>
    </div>
  )
}

