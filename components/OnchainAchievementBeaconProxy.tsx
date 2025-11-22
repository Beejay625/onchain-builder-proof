'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBeaconProxyProps {
  achievementId: bigint
}

export default function OnchainAchievementBeaconProxy({ achievementId }: OnchainAchievementBeaconProxyProps) {
  const { address } = useAccount()
  const [beaconAddress, setBeaconAddress] = useState('0xbeacon')
  const [proxyAddress, setProxyAddress] = useState('0xproxy')
  const [implementation, setImplementation] = useState('0ximpl')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordBeacon = () => {
    if (!address || !beaconAddress.trim()) return
    if (!beaconAddress.startsWith('0x') || !proxyAddress.startsWith('0x')) return

    const payload = `BEACON_PROXY|beacon:${beaconAddress}|proxy:${proxyAddress}|impl:${implementation}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-amber-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔦 Beacon Proxy</h3>
      <p className="text-sm text-gray-600 mb-4">Track beacon proxy pattern implementations for batch upgrades.</p>

      <div className="space-y-3 mb-4">
        <input value={beaconAddress} onChange={(e) => setBeaconAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Beacon address" />
        <input value={proxyAddress} onChange={(e) => setProxyAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proxy address" />
        <input value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Implementation" />
      </div>

      <button
        onClick={recordBeacon}
        disabled={isPending || isConfirming || !beaconAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record beacon proxy'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ✓ Beacon proxy configuration recorded.
        </div>
      )}
    </section>
  )
}
