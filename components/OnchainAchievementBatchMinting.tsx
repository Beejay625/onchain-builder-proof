'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Batch Minting
 * Mint multiple achievements in one transaction
 */
export default function OnchainAchievementBatchMinting() {
  const { address, isConnected } = useAccount()
  const [achievements, setAchievements] = useState<string[]>([''])

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const addAchievement = () => {
    setAchievements([...achievements, ''])
  }

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    setAchievements(newAchievements)
  }

  const handleBatchMint = async () => {
    if (!isConnected || !address) return
    
    const validAchievements = achievements.filter(a => a.trim().length > 0)
    if (validAchievements.length === 0) {
      alert('Please add at least one achievement')
      return
    }

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'batchMintAchievements',
        args: [validAchievements],
      })
    } catch (error) {
      console.error('Error batch minting:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📦 Batch Minting</h3>
        <p className="text-gray-600">Connect wallet to batch mint</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📦 Onchain Batch Minting</h3>
      <p className="text-gray-600 mb-4">
        Mint multiple achievements in one transaction to save gas
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Achievements</label>
          {achievements.map((achievement, index) => (
            <textarea
              key={index}
              value={achievement}
              onChange={(e) => updateAchievement(index, e.target.value)}
              placeholder="Enter achievement description..."
              className="w-full p-2 border rounded-lg mb-2"
              rows={2}
            />
          ))}
          <button
            onClick={addAchievement}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Achievement
          </button>
        </div>

        <button
          onClick={handleBatchMint}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Minting...' : `📦 Batch Mint ${achievements.filter(a => a.trim()).length} Achievements`}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Batch minting complete
          </div>
        )}
      </div>
    </div>
  )
}





