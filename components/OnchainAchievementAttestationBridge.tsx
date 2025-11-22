'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAttestationBridgeProps {
  achievementId: bigint
}

export default function OnchainAchievementAttestationBridge({ achievementId }: OnchainAchievementAttestationBridgeProps) {
  const { address } = useAccount()
  const [sourceStandard, setSourceStandard] = useState('EAS')
  const [targetStandard, setTargetStandard] = useState('Hypercerts')
  const [bridgeTx, setBridgeTx] = useState('0xbridgehash')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const bridgeAttestation = () => {
    if (!address || !bridgeTx.trim()) return

    const payload = `ATTESTATION_BRIDGE|from:${sourceStandard}|to:${targetStandard}|tx:${bridgeTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white border border-cyan-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌉 Attestation Bridge</h3>
      <p className="text-sm text-gray-600 mb-4">Prove cross-standard attestations for unstoppable credential mobility.</p>

      <div className="space-y-3 mb-4">
        <input value={sourceStandard} onChange={(e) => setSourceStandard(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Source" />
        <input value={targetStandard} onChange={(e) => setTargetStandard(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Target" />
        <input value={bridgeTx} onChange={(e) => setBridgeTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Bridge tx" />
      </div>

      <button
        onClick={bridgeAttestation}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Bridging...' : 'Record attestation bridge'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          ✓ Cross-standard bridge captured onchain.
        </div>
      )}
    </div>
  )
}
