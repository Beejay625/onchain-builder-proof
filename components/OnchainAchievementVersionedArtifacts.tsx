'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementVersionedArtifactsProps {
  achievementId: bigint
}

export default function OnchainAchievementVersionedArtifacts({ achievementId }: OnchainAchievementVersionedArtifactsProps) {
  const { address } = useAccount()
  const [tag, setTag] = useState('v1.4.0-alpha')
  const [artifactUrl, setArtifactUrl] = useState('ipfs://artifact-hash')
  const [checksum, setChecksum] = useState('sha256:deadbeef')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordArtifact = () => {
    if (!address || !artifactUrl.trim()) return

    const payload = `VERSIONED_ARTIFACT|tag:${tag}|url:${artifactUrl}|checksum:${checksum}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📦 Versioned Artifacts</h3>
      <p className="text-sm text-gray-600 mb-4">Anchor artifact tags and checksums next to milestone attestations.</p>

      <div className="space-y-3 mb-4">
        <input value={tag} onChange={(e) => setTag(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Tag" />
        <input value={artifactUrl} onChange={(e) => setArtifactUrl(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Artifact URL" />
        <input value={checksum} onChange={(e) => setChecksum(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Checksum" />
      </div>

      <button
        onClick={recordArtifact}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording artifact...' : 'Record versioned artifact'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">
          ✓ Artifact metadata committed onchain.
        </div>
      )}
    </section>
  )
}
