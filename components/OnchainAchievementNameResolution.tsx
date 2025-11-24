'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementNameResolutionProps {
  achievementId: bigint
}

export default function OnchainAchievementNameResolution({ achievementId }: OnchainAchievementNameResolutionProps) {
  const { address } = useAccount()
  const [name, setName] = useState('example.eth')
  const [resolvedAddress, setResolvedAddress] = useState('0xresolved')
  const [resolver, setResolver] = useState('0xresolver')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordResolution = () => {
    if (!address) return
    if (!name.trim()) return
    if (!resolvedAddress.trim() || !resolvedAddress.startsWith('0x')) return

    const payload = `NAME_RESOLUTION|name:${name}|address:${resolvedAddress}|resolver:${resolver}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔍 Name Resolution</h3>
      <p className="text-sm text-gray-600 mb-4">Record name resolution operations for ENS and other naming services.</p>

      <div className="space-y-3 mb-4">
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="Name" />
        <input value={resolvedAddress} onChange={(e) => setResolvedAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Resolved address" />
        <input value={resolver} onChange={(e) => setResolver(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Resolver address" />
      </div>

      <button
        onClick={recordResolution}
        disabled={isPending || isConfirming || !address || !resolvedAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record name resolution'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Name resolution recorded onchain.
        </div>
      )}
    </section>
  )
}
