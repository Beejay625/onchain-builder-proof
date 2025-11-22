'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCrossChainAttestationsProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChainAttestations({ achievementId }: OnchainAchievementCrossChainAttestationsProps) {
  const { address } = useAccount()
  const [targetChain, setTargetChain] = useState('Polygon')
  const [attestationHash, setAttestationHash] = useState('0xattest')
  const [bridgeProtocol, setBridgeProtocol] = useState('LayerZero')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const bridgeAttestation = () => {
    if (!address || !attestationHash.trim()) return

    const payload = `CROSS_CHAIN_ATTEST|target:${targetChain}|hash:${attestationHash}|bridge:${bridgeProtocol}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌐 Cross-Chain Attestations</h3>
      <p className="text-sm text-gray-600 mb-4">Record attestation bridges to other execution layers for universal verification.</p>

      <div className="space-y-3 mb-4">
        <input value={targetChain} onChange={(e) => setTargetChain(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Target chain" />
        <input value={attestationHash} onChange={(e) => setAttestationHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Attestation hash" />
        <input value={bridgeProtocol} onChange={(e) => setBridgeProtocol(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Bridge protocol" />
      </div>

      <button
        onClick={bridgeAttestation}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Bridging attestation...' : 'Bridge cross-chain attestation'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Cross-chain attestation reference stored.
        </div>
      )}
    </section>
  )
}
