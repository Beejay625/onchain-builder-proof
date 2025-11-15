'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface OnchainValidationProps {
  achievementId: bigint
}

export default function OnchainValidation({ achievementId }: OnchainValidationProps) {
  const [validationResult, setValidationResult] = useState<{
    valid: boolean
    details: any
  } | null>(null)

  const { data: post, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const validate = () => {
    if (post) {
      setValidationResult({
        valid: true,
        details: {
          exists: true,
          author: post.author,
          timestamp: post.timestamp,
        },
      })
    } else {
      setValidationResult({
        valid: false,
        details: { exists: false },
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✓ Validation</h3>
      
      <button
        onClick={validate}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        {isLoading ? 'Validating...' : 'Validate Achievement'}
      </button>

      {validationResult && (
        <div className={`p-4 rounded-lg ${
          validationResult.valid
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-red-50 border-2 border-red-500'
        }`}>
          <div className={`text-2xl mb-2 ${validationResult.valid ? 'text-green-600' : 'text-red-600'}`}>
            {validationResult.valid ? '✓' : '✗'}
          </div>
          <div className={`font-semibold ${validationResult.valid ? 'text-green-700' : 'text-red-700'}`}>
            {validationResult.valid ? 'Valid Achievement' : 'Invalid Achievement'}
          </div>
        </div>
      )}
    </div>
  )
}
