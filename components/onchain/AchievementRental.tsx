'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRentalProps {
  achievementId: bigint
}

export default function AchievementRental({ achievementId }: AchievementRentalProps) {
  const { address, isConnected } = useAccount()
  const [rentalPrice, setRentalPrice] = useState('0.01')
  const [rentalDuration, setRentalDuration] = useState(7)
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainRental')) {
    return null
  }

  const handleRent = async () => {
    if (!isConnected || !address || !rentalPrice) return

    try {
      const amount = parseEther(rentalPrice)
      const endDate = new Date(Date.now() + rentalDuration * 24 * 60 * 60 * 1000)
      const content = `Achievement Rental\nAchievement: #${achievementId.toString()}\nPrice: ${rentalPrice} ETH\nDuration: ${rentalDuration} days\nEnds: ${endDate.toISOString()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
        value: amount,
      })
    } catch (error) {
      console.error('Rental failed:', error)
    }
  }

  return (
    <AppCard title="⏱️ Achievement Rental" subtitle="Rent achievements temporarily" accent="teal">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rental Price (ETH)</label>
          <input
            type="number"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
          <input
            type="number"
            value={rentalDuration}
            onChange={(e) => setRentalDuration(Number(e.target.value))}
            min={1}
            max={365}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRent}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Renting...' : `Rent for ${rentalDuration} days`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Rental agreement recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

