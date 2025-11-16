'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMentorEndorsements() {
  const { address } = useAccount()
  const [mentorAddress, setMentorAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const requestEndorsement = async () => {
    if (!address || !mentorAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`MENTOR_ENDORSE: ${mentorAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🧑‍🏫 Mentor Endorsements</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Mentor address"
          value={mentorAddress}
          onChange={(e) => setMentorAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={requestEndorsement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Requesting...' : 'Request Endorsement'}
        </button>
        {isSuccess && <p className="text-green-600">Endorsement requested onchain!</p>}
      </div>
    </div>
  )
}

