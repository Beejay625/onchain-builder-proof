'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function SatelliteUplinkReceipts() {
  const { address, isConnected } = useAccount()
  const [groundStation, setGroundStation] = useState('ghana-bts-02')
  const [slot, setSlot] = useState('12:30 UTC')
  const [payload, setPayload] = useState('proof-bundle')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('satelliteUplinkReceipts')) {
    return null
  }

  const handleRecord = async () => {
    if (!isConnected || !address) return
    try {
      const content = `Satellite Uplink
Ground Station: ${groundStation}
Slot: ${slot}
Payload: ${payload}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Satellite receipt log failed:', error)
    }
  }

  return (
    <AppCard
      title="📡 Satellite Uplink Receipts"
      subtitle="Mirror availability for remote uplink relays powering BuilderProof."
      accent="blue"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Ground Station</label>
          <input
            type="text"
            value={groundStation}
            onChange={(e) => setGroundStation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Slot</label>
          <input
            type="text"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Payload</label>
          <input
            type="text"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecord}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Uplink'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Uplink receipt anchored
          </div>
        )}
      </div>
    </AppCard>
  )
}

