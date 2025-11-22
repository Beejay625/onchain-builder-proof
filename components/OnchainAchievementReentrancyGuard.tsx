'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReentrancyGuardProps {
  achievementId: bigint
}

export default function OnchainAchievementReentrancyGuard({ achievementId }: OnchainAchievementReentrancyGuardProps) {
  const { address } = useAccount()
  const [guardType, setGuardType] = useState('ReentrancyGuard')
  const [functionName, setFunctionName] = useState('withdraw')
  const [implementation, setImplementation] = useState('OpenZeppelin')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordGuard = () => {
    if (!address || !guardType.trim()) return

    const payload = `REENTRANCY_GUARD|type:${guardType}|function:${functionName}|impl:${implementation}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🛡️ Reentrancy Guard</h3>
      <p className="text-sm text-gray-600 mb-4">Document reentrancy protection mechanisms in smart contracts.</p>

      <div className="space-y-3 mb-4">
        <input value={guardType} onChange={(e) => setGuardType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Guard type" />
        <input value={functionName} onChange={(e) => setFunctionName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Protected function" />
        <input value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Implementation" />
      </div>

      <button
        onClick={recordGuard}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record reentrancy guard'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Reentrancy guard recorded onchain.
        </div>
      )}
    </section>
  )
}
