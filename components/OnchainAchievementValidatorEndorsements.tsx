'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementValidatorEndorsementsProps {
  achievementId: bigint
}

export default function OnchainAchievementValidatorEndorsements({ achievementId }: OnchainAchievementValidatorEndorsementsProps) {
  const { address } = useAccount()
  const [validator, setValidator] = useState('0xvalidator')
  const [network, setNetwork] = useState('EigenLayer')
  const [confidence, setConfidence] = useState('0.93')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const endorse = () => {
    if (!address || !validator.trim()) return

    const payload = `VALIDATOR_ENDORSE|validator:${validator}|network:${network}|confidence:${confidence}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🛠 Validator Endorsements</h3>
      <p className="text-sm text-gray-600 mb-4">Let active validators co-sign achievements for fast trust.</p>

      <div className="space-y-3 mb-4">
        <input value={validator} onChange={(e) => setValidator(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Validator" />
        <input value={network} onChange={(e) => setNetwork(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Network" />
        <input value={confidence} onChange={(e) => setConfidence(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Confidence" />
      </div>

      <button
        onClick={endorse}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Broadcasting...' : 'Broadcast validator endorsement'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Validator endorsement captured for downstream analytics.
        </div>
      )}
    </section>
  )
}
