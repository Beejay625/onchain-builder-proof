'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMEVProtectionProps {
  achievementId: bigint
}

export default function OnchainAchievementMEVProtection({ achievementId }: OnchainAchievementMEVProtectionProps) {
  const { address } = useAccount()
  const [protectionType, setProtectionType] = useState('private mempool')
  const [provider, setProvider] = useState('Flashbots')
  const [txHash, setTxHash] = useState('0xprotected')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordProtection = () => {
    if (!address || !txHash.trim()) return

    const payload = `MEV_PROTECTION|type:${protectionType}|provider:${provider}|tx:${txHash}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-slate-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🛡️ MEV Protection</h3>
      <p className="text-sm text-gray-600 mb-4">Document MEV protection measures for sensitive transactions.</p>

      <div className="space-y-3 mb-4">
        <input value={protectionType} onChange={(e) => setProtectionType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Protection type" />
        <input value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Provider" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction hash" />
      </div>

      <button
        onClick={recordProtection}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record MEV protection'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
          ✓ MEV protection record stored.
        </div>
      )}
    </section>
  )
}
