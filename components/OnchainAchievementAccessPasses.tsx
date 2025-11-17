'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAccessPasses() {
  const { address } = useAccount()
  const [passName, setPassName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const issuePass = async () => {
    if (!address || !passName) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`ACCESS_PASS: ${passName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎟️ Access Passes</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Pass name"
          value={passName}
          onChange={(e) => setPassName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={issuePass}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Issuing...' : 'Issue Access Pass'}
        </button>
        {isSuccess && <p className="text-green-600">Pass issued onchain!</p>}
      </div>
    </div>
  )
}
