'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementLicensing() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [license, setLicense] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addLicense = async () => {
    if (!address || !postId || !license) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `LICENSE: ${license}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Achievement Licensing</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="License type (MIT, Apache, etc.)"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={addLicense}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add License'}
        </button>
        {isSuccess && <p className="text-green-600">License recorded onchain!</p>}
      </div>
    </div>
  )
}

