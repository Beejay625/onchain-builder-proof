'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementPrivacySettings() {
  const { address } = useAccount()
  const [privacyLevel, setPrivacyLevel] = useState('public')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const updatePrivacy = async () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`PRIVACY: ${privacyLevel}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔒 Privacy Settings</h2>
      <div className="space-y-4">
        <select
          value={privacyLevel}
          onChange={(e) => setPrivacyLevel(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friends">Friends Only</option>
        </select>
        <button
          onClick={updatePrivacy}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Updating...' : 'Update Privacy'}
        </button>
        {isSuccess && <p className="text-green-600">Privacy updated onchain!</p>}
      </div>
    </div>
  )
}

