'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementProxyPatternsProps {
  achievementId: bigint
}

export default function OnchainAchievementProxyPatterns({ achievementId }: OnchainAchievementProxyPatternsProps) {
  const { address } = useAccount()
  const [proxyAddress, setProxyAddress] = useState('0xproxy')
  const [implementation, setImplementation] = useState('0ximpl')
  const [patternType, setPatternType] = useState('transparent')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordProxy = () => {
    if (!address) return
    if (!proxyAddress.trim()) return
    if (!implementation.trim() || !implementation.startsWith('0x')) return
    if (!proxyAddress.startsWith('0x') || proxyAddress.length !== 42) return

    const payload = `PROXY_PATTERNS|proxy:${proxyAddress}|impl:${implementation}|type:${patternType}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔀 Proxy Patterns</h3>
      <p className="text-sm text-gray-600 mb-4">Record proxy pattern implementations and upgrade configurations.</p>

      <div className="space-y-3 mb-4">
        <input value={proxyAddress} onChange={(e) => setProxyAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Proxy address" />
        <input value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Implementation address" />
        <input value={patternType} onChange={(e) => setPatternType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pattern type" />
      </div>

      <button
        onClick={recordProxy}
        disabled={isPending || isConfirming || !address || !proxyAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record proxy pattern'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Proxy pattern recorded onchain.
        </div>
      )}
    </section>
  )
}
