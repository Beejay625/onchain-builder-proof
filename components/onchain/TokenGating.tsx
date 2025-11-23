'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface TokenGatingProps {
  achievementId: bigint
}

export default function TokenGating({ achievementId }: TokenGatingProps) {
  const { address, isConnected } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')
  const [requiredAmount, setRequiredAmount] = useState('1')
  const [gateType, setGateType] = useState<'ownership' | 'balance'>('ownership')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('tokenGating')) {
    return null
  }

  const handleSetGate = async () => {
    if (!isConnected || !address || !tokenAddress || !requiredAmount) return

    try {
      const content = `Token Gating\nAchievement: #${achievementId.toString()}\nToken: ${tokenAddress}\nType: ${gateType}\nRequired: ${requiredAmount}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Token gating failed:', error)
    }
  }

  return (
    <AppCard title="🔑 Token Gating" subtitle="Gate achievements with token requirements" accent="emerald">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Address</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gate Type</label>
          <select
            value={gateType}
            onChange={(e) => setGateType(e.target.value as 'ownership' | 'balance')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="ownership">Ownership</option>
            <option value="balance">Balance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Required Amount</label>
          <input
            type="text"
            value={requiredAmount}
            onChange={(e) => setRequiredAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetGate}
          disabled={isPending || isConfirming || !isConnected || !tokenAddress || !requiredAmount}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Token Gate'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Token gate configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

