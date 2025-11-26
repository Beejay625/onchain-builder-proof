'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function TreasuryContributions() {
  const { address, isConnected } = useAccount()
  const [contributionAmount, setContributionAmount] = useState('0.1')
  const [contributionPurpose, setContributionPurpose] = useState('')
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainTreasury')) {
    return null
  }

  const handleContribute = async () => {
    if (!isConnected || !address || !contributionAmount) return

    try {
      const amount = parseEther(contributionAmount)
      const content = `Treasury Contribution: ${contributionAmount} ETH${contributionPurpose ? `\nPurpose: ${contributionPurpose}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
        value: amount,
      })
    } catch (error) {
      console.error('Treasury contribution failed:', error)
    }
  }

  const hasBalance = balance && parseFloat(formatEther(balance.value)) >= parseFloat(contributionAmount)

  return (
    <AppCard title="🏦 Treasury Contribution" subtitle="Contribute to treasury funds" accent="amber">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Amount (ETH)</label>
          <input
            type="number"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Purpose (optional)</label>
          <input
            type="text"
            value={contributionPurpose}
            onChange={(e) => setContributionPurpose(e.target.value)}
            placeholder="Why are you contributing?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleContribute}
          disabled={isPending || isConfirming || !isConnected || !hasBalance}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Contributing...' : `Contribute ${contributionAmount} ETH`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Treasury contribution recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}




