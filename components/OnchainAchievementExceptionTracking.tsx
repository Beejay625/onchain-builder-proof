'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementExceptionTrackingProps {
  achievementId: bigint
}

export default function OnchainAchievementExceptionTracking({ achievementId }: OnchainAchievementExceptionTrackingProps) {
  const { address } = useAccount()
  const [exceptionDetail, setExceptionDetail] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logException = () => {
    if (!address || !exceptionDetail.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `EXCEPTION: ${exceptionDetail}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚠️ Exception Tracking</h3>
      <textarea
        value={exceptionDetail}
        onChange={(e) => setExceptionDetail(e.target.value)}
        placeholder="Describe the exception..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      <button
        onClick={logException}
        disabled={isPending || isConfirming || !exceptionDetail.trim()}
        className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Logging...' : 'Log Exception Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-500 rounded-lg text-sm text-rose-700">
          ✓ Exception logged onchain
        </div>
      )}
    </div>
  )
}
