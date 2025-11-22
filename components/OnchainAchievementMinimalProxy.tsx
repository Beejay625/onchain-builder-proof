'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMinimalProxyProps {
  achievementId: bigint
}

export default function OnchainAchievementMinimalProxy({ achievementId }: OnchainAchievementMinimalProxyProps) {
  const { address } = useAccount()
  const [implementation, setImplementation] = useState('0ximpl')
  const [proxyAddress, setProxyAddress] = useState('0xproxy')
  const [gasSaved, setGasSaved] = useState('40%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordProxy = () => {
    if (!address || !implementation.trim()) return
    if (!implementation.startsWith('0x') || !proxyAddress.startsWith('0x')) return

    const payload = `MINIMAL_PROXY|impl:${implementation}|proxy:${proxyAddress}|gasSaved:${gasSaved}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-rose-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🎯 Minimal Proxy</h3>
      <p className="text-sm text-gray-600 mb-4">Record EIP-1167 minimal proxy clone deployments.</p>

      <div className="space-y-3 mb-4">
        <input value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Implementation address" />
        <input value={proxyAddress} onChange={(e) => setProxyAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proxy address" />
        <input value={gasSaved} onChange={(e) => setGasSaved(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Gas saved" />
      </div>

      <button
        onClick={recordProxy}
        disabled={isPending || isConfirming || !implementation.startsWith('0x')}
        className="w-full px-4 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record minimal proxy'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">
          ✓ Minimal proxy deployment recorded.
        </div>
      )}
    </section>
  )
}
