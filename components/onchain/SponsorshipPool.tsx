'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface SponsorshipPoolProps {
  achievementId: bigint
}

export default function SponsorshipPool({ achievementId }: SponsorshipPoolProps) {
  const { address, isConnected } = useAccount()
  const [sponsorAmount, setSponsorAmount] = useState('0.001')
  const [sponsorMessage, setSponsorMessage] = useState('')
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainSponsorshipPool')) {
    return null
  }

  const handleSponsor = async () => {
    if (!isConnected || !address || !sponsorAmount) return

    try {
      const amount = parseEther(sponsorAmount)
      const content = `Sponsored achievement #${achievementId.toString()} with ${sponsorAmount} ETH${sponsorMessage ? `: ${sponsorMessage}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
        value: amount,
      })
    } catch (error) {
      console.error('Sponsorship failed:', error)
    }
  }

  const hasBalance = balance && parseFloat(formatEther(balance.value)) >= parseFloat(sponsorAmount)

  return (
    <AppCard title="💰 Sponsorship Pool" subtitle="Sponsor achievements with ETH contributions" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor Amount (ETH)</label>
          <input
            type="number"
            value={sponsorAmount}
            onChange={(e) => setSponsorAmount(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
          <input
            type="text"
            value={sponsorMessage}
            onChange={(e) => setSponsorMessage(e.target.value)}
            placeholder="Why are you sponsoring this?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSponsor}
          disabled={isPending || isConfirming || !isConnected || !hasBalance}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Sponsoring...' : `Sponsor ${sponsorAmount} ETH`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Sponsorship recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}





