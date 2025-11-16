'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRental() {
  const { address } = useAccount()
  const [rentalDuration, setRentalDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const rentAchievement = async () => {
    if (!address || !rentalDuration) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`RENTAL: ${rentalDuration} days`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏱️ Achievement Rental</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Rental duration (days)"
          value={rentalDuration}
          onChange={(e) => setRentalDuration(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={rentAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Renting...' : 'Rent Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Rental created onchain!</p>}
      </div>
    </div>
  )
}
