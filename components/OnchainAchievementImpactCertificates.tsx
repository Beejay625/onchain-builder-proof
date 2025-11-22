'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementImpactCertificatesProps {
  achievementId: bigint
}

export default function OnchainAchievementImpactCertificates({ achievementId }: OnchainAchievementImpactCertificatesProps) {
  const { address } = useAccount()
  const [impactDomain, setImpactDomain] = useState('Public Goods')
  const [metric, setMetric] = useState('5000 users served')
  const [proofUrl, setProofUrl] = useState('https://impactscan.xyz/proof')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const notarizeImpact = () => {
    if (!address || !metric.trim()) return

    const payload = `IMPACT_CERTIFICATE|domain:${impactDomain}|metric:${metric}|evidence:${proofUrl}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white rounded-xl border border-teal-100 shadow p-6">
      <h3 className="text-xl font-bold mb-2">📈 Impact Certificates</h3>
      <p className="text-sm text-gray-600 mb-4">Attach verifiable impact statements with onchain evidence links.</p>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          value={impactDomain}
          onChange={(event) => setImpactDomain(event.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Impact domain"
        />
        <input
          type="text"
          value={metric}
          onChange={(event) => setMetric(event.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Metric"
        />
        <input
          type="url"
          value={proofUrl}
          onChange={(event) => setProofUrl(event.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Evidence URL"
        />
      </div>

      <button
        onClick={notarizeImpact}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing certificate...' : 'Seal impact certificate'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">
          ✓ Impact certificate stored immutably.
        </div>
      )}
    </div>
  )
}
