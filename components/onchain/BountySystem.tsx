'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function BountySystem() {
  const { address, isConnected } = useAccount()
  const [bountyAmount, setBountyAmount] = useState('0.01')
  const [bountyDescription, setBountyDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainBountySystem')) {
    return null
  }

  const handleCreateBounty = async () => {
    if (!isConnected || !address || !bountyDescription.trim()) return

    try {
      const amount = parseEther(bountyAmount)
      const content = `Bounty: ${bountyDescription}\nAmount: ${bountyAmount} ETH${deadline ? `\nDeadline: ${deadline}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
        value: amount,
      })
    } catch (error) {
      console.error('Bounty creation failed:', error)
    }
  }

  const hasBalance = balance && parseFloat(formatEther(balance.value)) >= parseFloat(bountyAmount)

  return (
    <AppCard title="🎯 Achievement Bounty" subtitle="Create bounties for achievement completion" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bounty Amount (ETH)</label>
          <input
            type="number"
            value={bountyAmount}
            onChange={(e) => setBountyAmount(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bounty Description</label>
          <textarea
            value={bountyDescription}
            onChange={(e) => setBountyDescription(e.target.value)}
            placeholder="What achievement should be completed?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (optional)</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateBounty}
          disabled={isPending || isConfirming || !isConnected || !hasBalance || !bountyDescription.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : `Create ${bountyAmount} ETH Bounty`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Bounty created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}


