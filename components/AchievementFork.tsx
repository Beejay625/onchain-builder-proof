'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementForkProps {
  originalAchievementId: bigint
}

export default function AchievementFork({ originalAchievementId }: AchievementForkProps) {
  const [forkContent, setForkContent] = useState('')
  const [isForking, setIsForking] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const forkAchievement = async () => {
    if (!forkContent.trim()) return

    setIsForking(true)
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'forkAchievement',
        args: [originalAchievementId, forkContent],
      })
    } catch (error) {
      console.error('Fork error:', error)
      setIsForking(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🍴 Fork Achievement</h3>
      <textarea
        value={forkContent}
        onChange={(e) => setForkContent(e.target.value)}
        placeholder="Add your variation..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
        rows={4}
      />
      <button
        onClick={forkAchievement}
        disabled={isPending || isForking}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isForking ? 'Forking...' : 'Fork Achievement'}
      </button>
      {isSuccess && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
          ✓ Achievement forked successfully
        </div>
      )}
    </div>
  )
}
