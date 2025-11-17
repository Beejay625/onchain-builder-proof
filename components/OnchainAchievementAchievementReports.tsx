'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementReports() {
  const { address } = useAccount()
  const [reportReason, setReportReason] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitReport = async () => {
    if (!address || !reportReason) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`REPORT: ${reportReason}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚨 Achievement Reports</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Report reason"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={submitReport}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Report'}
        </button>
        {isSuccess && <p className="text-green-600">Report submitted onchain!</p>}
      </div>
    </div>
  )
}

