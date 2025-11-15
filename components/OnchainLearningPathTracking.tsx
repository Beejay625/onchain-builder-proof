'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainLearningPathTracking() {
  const { address } = useAccount()
  const [course, setCourse] = useState('')
  const [progress, setProgress] = useState('')
  const [certificate, setCertificate] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const trackLearning = async () => {
    if (!address || !course || !progress) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Learning Path: ${course} - Progress: ${progress}% - Cert: ${certificate}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Learning Path Tracking</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Course/Learning resource"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Progress %"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Certificate URL (optional)"
          value={certificate}
          onChange={(e) => setCertificate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={trackLearning}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track Learning'}
        </button>
        {isSuccess && <p className="text-green-600">Learning progress tracked onchain!</p>}
      </div>
    </div>
  )
}

