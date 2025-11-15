'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function AchievementMerging() {
  const [achievementIds, setAchievementIds] = useState<string[]>(['', ''])

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const mergeAchievements = async () => {
    const ids = achievementIds.filter(id => id.trim()).map(id => BigInt(id))
    if (ids.length < 2) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'mergeAchievements',
        args: [ids],
      })
    } catch (error) {
      console.error('Merge error:', error)
    }
  }

  const addIdField = () => {
    setAchievementIds([...achievementIds, ''])
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔀 Merge Achievements</h3>
      <div className="space-y-3">
        {achievementIds.map((id, index) => (
          <div key={index}>
            <label className="block text-sm font-medium mb-2">Achievement ID {index + 1}</label>
            <input
              type="text"
              value={id}
              onChange={(e) => {
                const newIds = [...achievementIds]
                newIds[index] = e.target.value
                setAchievementIds(newIds)
              }}
              placeholder="123"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
        <button
          onClick={addIdField}
          className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
        >
          + Add Another
        </button>
        <button
          onClick={mergeAchievements}
          disabled={isPending || achievementIds.filter(id => id.trim()).length < 2}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Merging...' : 'Merge Achievements'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Achievements merged successfully
          </div>
        )}
      </div>
    </div>
  )
}
