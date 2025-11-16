'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAccessControl() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [allowedAddress, setAllowedAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const grantAccess = async () => {
    if (!address || !postId || !allowedAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `ACCESS: Grant to ${allowedAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Access Control</h2>
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
          placeholder="Allowed address"
          value={allowedAddress}
          onChange={(e) => setAllowedAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={grantAccess}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Granting...' : 'Grant Access'}
        </button>
        {isSuccess && <p className="text-green-600">Access granted onchain!</p>}
      </div>
    </div>
  )
}

