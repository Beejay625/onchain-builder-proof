'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSecurityScanProps {
  achievementId: bigint
}

export default function OnchainAchievementSecurityScan({ achievementId }: OnchainAchievementSecurityScanProps) {
  const { address, isConnected } = useAccount()
  const [scanTool, setScanTool] = useState('')
  const [scanResult, setScanResult] = useState('')
  const [scanLink, setScanLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !scanTool.trim() || !scanResult.trim()) return

    try {
      const payload = `SECURITY_SCAN:tool:${scanTool}:result:${scanResult}:link:${scanLink || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🕵️ Security Scan submission failed:', error)
    }
  }

  return (
    <AppCard title="🕵️ Security Scan" subtitle="Share latest security review details" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tool / Partner *</label>
          <input
            type="text"
            value={scanTool}
            onChange={(e) => setScanTool(e.target.value)}
            placeholder="Slither"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Result Summary *</label>
          <textarea
            value={scanResult}
            onChange={(e) => setScanResult(e.target.value)}
            placeholder="No critical issues"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Link (optional)</label>
          <input
            type="text"
            value={scanLink}
            onChange={(e) => setScanLink(e.target.value)}
            placeholder="ipfs://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !scanTool.trim() || !scanResult.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Security Scan' : 'Record Security Scan'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Security scan posted
          </div>
        )}
      </div>
    </AppCard>
  )
}
