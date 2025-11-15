'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementValidation() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [validator, setValidator] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: postId ? [BigInt(postId)] : undefined,
  })
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const validateAchievement = async () => {
    if (!address || !postId || !validator) return
    const validationResult = isValid ? 'validated' : 'rejected'
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `Validation: ${validationResult} by ${validator}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Achievement Validation</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {post && (
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Content:</p>
            <p className="font-medium">{(post as any).content}</p>
          </div>
        )}
        <input
          type="text"
          placeholder="Validator address"
          value={validator}
          onChange={(e) => setValidator(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <div className="flex gap-4">
          <button
            onClick={() => setIsValid(true)}
            className={`flex-1 px-4 py-2 rounded-lg ${isValid === true ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            ✓ Validate
          </button>
          <button
            onClick={() => setIsValid(false)}
            className={`flex-1 px-4 py-2 rounded-lg ${isValid === false ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            ✗ Reject
          </button>
        </div>
        <button
          onClick={validateAchievement}
          disabled={isPending || isConfirming || isValid === null}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Validating...' : 'Submit Validation'}
        </button>
        {isSuccess && <p className="text-green-600">Validation submitted onchain!</p>}
      </div>
    </div>
  )
}

