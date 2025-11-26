'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function EscrowAccounts() {
  const { address, isConnected } = useAccount()
  const [escrowAmount, setEscrowAmount] = useState('0.1')
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('')
  const [releaseCondition, setReleaseCondition] = useState('')
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainEscrow')) {
    return null
  }

  const handleCreateEscrow = async () => {
    if (!isConnected || !address || !escrowAmount || !beneficiaryAddress) return

    try {
      const amount = parseEther(escrowAmount)
      const content = `Escrow Account Created\nAmount: ${escrowAmount} ETH\nBeneficiary: ${beneficiaryAddress}${releaseCondition ? `\nRelease Condition: ${releaseCondition}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
        value: amount,
      })
    } catch (error) {
      console.error('Escrow creation failed:', error)
    }
  }

  const hasBalance = balance && parseFloat(formatEther(balance.value)) >= parseFloat(escrowAmount)

  return (
    <AppCard title="🔒 Escrow Account" subtitle="Create escrow accounts for achievements" accent="rose">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Escrow Amount (ETH)</label>
          <input
            type="number"
            value={escrowAmount}
            onChange={(e) => setEscrowAmount(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Address</label>
          <input
            type="text"
            value={beneficiaryAddress}
            onChange={(e) => setBeneficiaryAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Release Condition (optional)</label>
          <input
            type="text"
            value={releaseCondition}
            onChange={(e) => setReleaseCondition(e.target.value)}
            placeholder="When should funds be released?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateEscrow}
          disabled={isPending || isConfirming || !isConnected || !hasBalance || !beneficiaryAddress}
          className="w-full rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : `Create ${escrowAmount} ETH Escrow`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Escrow account created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}




