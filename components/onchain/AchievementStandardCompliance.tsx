'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementStandardComplianceProps {
  achievementId: bigint
}

export default function AchievementStandardCompliance({ achievementId }: AchievementStandardComplianceProps) {
  const { address, isConnected } = useAccount()
  const [complianceStandard, setComplianceStandard] = useState<'erc721' | 'erc1155' | 'eip712' | 'eip2612'>('erc721')
  const [complianceStatus, setComplianceStatus] = useState<'compliant' | 'non-compliant' | 'pending'>('pending')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementStandardCompliance')) {
    return null
  }

  const handleSetCompliance = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Standard Compliance\nAchievement: #${achievementId.toString()}\nStandard: ${complianceStandard}\nStatus: ${complianceStatus}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Compliance update failed:', error)
    }
  }

  return (
    <AppCard title="✅ Achievement Standard Compliance" subtitle="Track compliance with blockchain standards" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Standard</label>
          <select
            value={complianceStandard}
            onChange={(e) => setComplianceStandard(e.target.value as 'erc721' | 'erc1155' | 'eip712' | 'eip2612')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="erc721">ERC-721</option>
            <option value="erc1155">ERC-1155</option>
            <option value="eip712">EIP-712</option>
            <option value="eip2612">EIP-2612</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Status</label>
          <select
            value={complianceStatus}
            onChange={(e) => setComplianceStatus(e.target.value as 'compliant' | 'non-compliant' | 'pending')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="compliant">Compliant</option>
            <option value="non-compliant">Non-Compliant</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button
          onClick={handleSetCompliance}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Compliance'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Compliance status updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

