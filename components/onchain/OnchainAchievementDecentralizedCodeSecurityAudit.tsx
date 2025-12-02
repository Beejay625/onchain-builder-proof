'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementDecentralizedCodeSecurityAuditProps {
  achievementId: bigint
}

export default function OnchainAchievementDecentralizedCodeSecurityAudit({
  achievementId,
}: OnchainAchievementDecentralizedCodeSecurityAuditProps) {
  const { address, isConnected } = useAccount()
  const [auditId, setAuditId] = useState('')
  const [securityScore, setSecurityScore] = useState('')
  const [auditScope, setAuditScope] = useState('full')
  const [auditStatus, setAuditStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementDecentralizedCodeSecurityAudit')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !auditId || !securityScore) return

    try {
      const proofHash = keccak256(toBytes(`${auditId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logDecentralizedCodeSecurityAudit',
        args: [
          achievementId,
          auditId,
          BigInt(securityScore),
          auditScope,
          proofHash,
          auditStatus,
        ],
      })
    } catch (error) {
      console.error('Security audit submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Decentralized Code Security Audit"
      subtitle="Comprehensive security auditing for decentralized code repositories"
      accent="red"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audit ID *
          </label>
          <input
            type="text"
            value={auditId}
            onChange={(e) => setAuditId(e.target.value)}
            placeholder="audit-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Score (1-100) *
          </label>
          <input
            type="number"
            value={securityScore}
            onChange={(e) => setSecurityScore(e.target.value)}
            placeholder="92"
            min="1"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audit Scope *
          </label>
          <select
            value={auditScope}
            onChange={(e) => setAuditScope(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          >
            <option value="full">Full</option>
            <option value="partial">Partial</option>
            <option value="targeted">Targeted</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={auditStatus}
            onChange={(e) => setAuditStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !auditId || !securityScore}
          className="w-full rounded-lg bg-red-600 text-white py-3 px-4 font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Audited!'
                : 'Submit Security Audit'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Security audit recorded!</p>
        )}
      </div>
    </AppCard>
  )
}

