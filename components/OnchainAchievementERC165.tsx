'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementERC165Props {
  achievementId: bigint
}

export default function OnchainAchievementERC165({ achievementId }: OnchainAchievementERC165Props) {
  const { address } = useAccount()
  const [interfaceId, setInterfaceId] = useState('0x80ac58cd')
  const [supported, setSupported] = useState('true')
  const [standard, setStandard] = useState('ERC721')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordInterface = () => {
    if (!address || !interfaceId.trim()) return
    if (!interfaceId.startsWith('0x')) return

    const payload = `ERC165|interface:${interfaceId}|supported:${supported}|standard:${standard}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-violet-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔌 ERC165 Interface</h3>
      <p className="text-sm text-gray-600 mb-4">Record ERC165 interface support declarations.</p>

      <div className="space-y-3 mb-4">
        <input value={interfaceId} onChange={(e) => setInterfaceId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-500" placeholder=" requiredInterface ID" />
        <select value={supported} onChange={(e) => setSupported(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2">
          <option value="true">Supported</option>
          <option value="false">Not Supported</option>
        </select>
        <input value={standard} onChange={(e) => setStandard(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder=" requiredStandard name" />
      </div>

      <button
        onClick={recordInterface}
        disabled={isPending || isConfirming || !interfaceId.startsWith('0x')}
        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record ERC165 interface'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">
          ✓ ERC165 interface support recorded.
        </div>
      )}
    </section>
  )
}
