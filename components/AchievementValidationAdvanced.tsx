'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementValidationAdvancedProps {
  achievementId: bigint
}

export default function AchievementValidationAdvanced({ achievementId }: AchievementValidationAdvancedProps) {
  const [verifierAddress, setVerifierAddress] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const validateWithVerifier = async () => {
    if (!verifierAddress.startsWith('0x')) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'validateAchievement',
        args: [achievementId, verifierAddress as `0x${string}`],
      })
    } catch (error) {
      console.error('Validation error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Validate Achievement</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Verifier Address</label>
          <input
            type="text"
            value={verifierAddress}
            onChange={(e) => setVerifierAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={validateWithVerifier}
          disabled={isPending}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending ? 'Validating...' : 'Validate with Verifier'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Achievement validated by verifier
          </div>
        )}
      </div>
    </div>
  )
}
