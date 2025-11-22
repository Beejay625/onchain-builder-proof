'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDePINProofProps {
  achievementId: bigint
}

export default function OnchainAchievementDePINProof({ achievementId }: OnchainAchievementDePINProofProps) {
  const { address } = useAccount()
  const [deviceId, setDeviceId] = useState('sensor-42')
  const [coverage, setCoverage] = useState('12.4 km²')
  const [uptime, setUptime] = useState('99.2%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const notarizeDePIN = () => {
    if (!address || !deviceId.trim()) return

    const payload = `DEPIN_PROOF|device:${deviceId}|coverage:${coverage}|uptime:${uptime}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white rounded-xl border border-slate-100 shadow p-6">
      <h3 className="text-xl font-bold mb-2">📡 DePIN Proof</h3>
      <p className="text-sm text-gray-600 mb-4">Anchor decentralized physical infrastructure stats next to the build artifact.</p>

      <div className="space-y-3 mb-4">
        <input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Device ID" />
        <input value={coverage} onChange={(e) => setCoverage(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Coverage" />
        <input value={uptime} onChange={(e) => setUptime(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Uptime" />
      </div>

      <button
        onClick={notarizeDePIN}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Anchoring proof...' : 'Anchor DePIN proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
          ✓ DePIN metrics sealed to the chain.
        </div>
      )}
    </section>
  )
}
