'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMetadataGuardianProps {
  achievementId: bigint
}

export default function OnchainAchievementMetadataGuardian({ achievementId }: OnchainAchievementMetadataGuardianProps) {
  const { address } = useAccount()
  const [checksum, setChecksum] = useState('sha256:abcd1234')
  const [storageNetwork, setStorageNetwork] = useState('Arweave')
  const [version, setVersion] = useState('v5.2.1')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const anchorManifest = () => {
    if (!address || !checksum.trim()) return

    const payload = `METADATA_GUARDIAN|checksum:${checksum}|network:${storageNetwork}|version:${version}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2">🛡️ Metadata Guardian</h3>
      <p className="text-sm text-gray-600 mb-4">Seal immutable metadata manifests alongside each achievement.</p>

      <div className="space-y-3 mb-4">
        <input value={checksum} onChange={(e) => setChecksum(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Checksum" />
        <input value={storageNetwork} onChange={(e) => setStorageNetwork(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Storage network" />
        <input value={version} onChange={(e) => setVersion(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Version" />
      </div>

      <button
        onClick={anchorManifest}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Anchoring manifest...' : 'Anchor metadata manifest'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
          ✓ Metadata manifest pinned to achievement record.
        </div>
      )}
    </section>
  )
}
