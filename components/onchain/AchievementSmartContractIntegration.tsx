'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSmartContractIntegrationProps {
  achievementId: bigint
}

export default function AchievementSmartContractIntegration({ achievementId }: AchievementSmartContractIntegrationProps) {
  const { address, isConnected } = useAccount()
  const [contractAddress, setContractAddress] = useState('')
  const [functionName, setFunctionName] = useState('')
  const [integrationType, setIntegrationType] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementSmartContractIntegration')) {
    return null
  }

  const handleIntegrate = async () => {
    if (!isConnected || !address || !contractAddress.trim() || !functionName.trim()) return

    try {
      const integrationContent = `SCINTEGRATION:${contractAddress}:${functionName}:${integrationType || 'custom'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, integrationContent],
      })
    } catch (error) {
      console.error('Smart contract integration failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Smart Contract Integration" subtitle="Integrate with external smart contracts" accent="slate">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contract Address</label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Function Name</label>
          <input
            type="text"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder="e.g., mint, transfer, stake"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Integration Type</label>
          <select
            value={integrationType}
            onChange={(e) => setIntegrationType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="custom">Custom</option>
            <option value="nft_mint">NFT Mint</option>
            <option value="token_reward">Token Reward</option>
            <option value="staking">Staking</option>
            <option value="governance">Governance</option>
          </select>
        </div>
        <button
          onClick={handleIntegrate}
          disabled={isPending || isConfirming || !isConnected || !contractAddress.trim() || !functionName.trim()}
          className="w-full rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Integrating...' : 'Record Integration'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm text-slate-800">
            ✅ Smart contract integration recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

