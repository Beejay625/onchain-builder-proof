'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatEthAmount } from 'viem'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementSponsorshipProps {
  achievementId: bigint
}

export default function AchievementSponsorship({ achievementId }: AchievementSponsorshipProps) {
  const [sponsorAmount, setSponsorAmount] = useState('0.01')
  const [sponsorMessage, setSponsorMessage] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const sponsorAchievement = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'sponsorAchievement',
        args: [achievementId, sponsorMessage],
        value: parseUnits(sponsorAmount, 18),
      })
    } catch (error) {
      console.error('Sponsorship error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Sponsor Achievement</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Amount (ETH)</label>
          <input
            type="number"
            value={sponsorAmount}
            onChange={(e) => setSponsorAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            step="0.001"
            min="0.001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message (Optional)</label>
          <textarea
            value={sponsorMessage}
            onChange={(e) => setSponsorMessage(e.target.value)}
            placeholder="Support message..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={2}
          />
        </div>
        <button
          onClick={sponsorAchievement}
          disabled={isPending}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending ? 'Sponsoring...' : `Sponsor ${formatEthAmount(parseUnits(sponsorAmount, 18))}`}
        </button>
        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Sponsorship recorded onchain
          </div>
        )}
      </div>
    </div>
  )
}
