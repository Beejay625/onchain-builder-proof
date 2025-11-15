'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { MILESTONES } from '@/lib/constants'

export default function OnchainMilestoneRewards() {
  const { address } = useAccount()
  const [nextMilestone, setNextMilestone] = useState(0)
  const [progress, setProgress] = useState(0)
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })

  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (userPosts) {
      const count = Array.from(userPosts as bigint[]).length
      const milestone = MILESTONES.find(m => m > count) || MILESTONES[MILESTONES.length - 1]
      setNextMilestone(milestone)
      setProgress(count)
    }
  }, [userPosts])

  const claimReward = async () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Claimed milestone reward at ${progress} achievements`],
    })
  }

  const progressPercent = nextMilestone > 0 ? (progress / nextMilestone) * 100 : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Milestone Rewards</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 mb-2">Progress: {progress} / {nextMilestone}</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>
        {progress >= nextMilestone && (
          <button
            onClick={claimReward}
            disabled={isPending || isConfirming}
            className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
          >
            {isPending || isConfirming ? 'Claiming...' : 'Claim Reward'}
          </button>
        )}
        {isSuccess && <p className="text-green-600">Reward claimed onchain!</p>}
      </div>
    </div>
  )
}

