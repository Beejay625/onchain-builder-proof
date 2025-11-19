'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTimeCapsule() {
  const { address } = useAccount()
  const [content, setContent] = useState('')
  const [unlockDate, setUnlockDate] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createTimeCapsule = async () => {
    if (!address || !content || !unlockDate) return
    const unlockTimestamp = Math.floor(new Date(unlockDate).getTime() / 1000)
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`TIMECAPSULE:${unlockTimestamp}:${content}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏳ Time Capsule</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Achievement content to lock"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="datetime-local"
          value={unlockDate}
          onChange={(e) => setUnlockDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createTimeCapsule}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Time Capsule'}
        </button>
        {isSuccess && <p className="text-green-600">Time capsule created onchain!</p>}
      </div>
    </div>
  )
}
