'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementCrossProtocolAttestationBridgeProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossProtocolAttestationBridge({
  achievementId,
}: OnchainAchievementCrossProtocolAttestationBridgeProps) {
  const { address, isConnected } = useAccount()
  const [bridgeId, setBridgeId] = useState('')
  const [sourceProtocol, setSourceProtocol] = useState('')
  const [targetProtocol, setTargetProtocol] = useState('')
  const [attestationCount, setAttestationCount] = useState('')
  const [bridgeStatus, setBridgeStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementCrossProtocolAttestationBridge')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !bridgeId || !sourceProtocol || !targetProtocol || !attestationCount) return

    try {
      const proofHash = keccak256(toBytes(`${bridgeId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logCrossProtocolAttestationBridge',
        args: [
          achievementId,
          bridgeId,
          sourceProtocol,
          targetProtocol,
          BigInt(attestationCount),
          proofHash,
          bridgeStatus,
        ],
      })
    } catch (error) {
      console.error('Cross-protocol attestation bridge submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Cross-Protocol Attestation Bridge"
      subtitle="Bridge attestations between different protocols with secure verification"
      accent="indigo"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bridge ID *
          </label>
          <input
            type="text"
            value={bridgeId}
            onChange={(e) => setBridgeId(e.target.value)}
            placeholder="bridge-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Protocol *
          </label>
          <input
            type="text"
            value={sourceProtocol}
            onChange={(e) => setSourceProtocol(e.target.value)}
            placeholder="Ethereum"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Protocol *
          </label>
          <input
            type="text"
            value={targetProtocol}
            onChange={(e) => setTargetProtocol(e.target.value)}
            placeholder="Polygon"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attestation Count *
          </label>
          <input
            type="number"
            value={attestationCount}
            onChange={(e) => setAttestationCount(e.target.value)}
            placeholder="25"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={bridgeStatus}
            onChange={(e) => setBridgeStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !bridgeId || !sourceProtocol || !targetProtocol || !attestationCount}
          className="w-full rounded-lg bg-indigo-600 text-white py-3 px-4 font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Bridged!'
                : 'Bridge Attestations'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Attestation bridge successful!</p>
        )}
      </div>
    </AppCard>
  )
}

