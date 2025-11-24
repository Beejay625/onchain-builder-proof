'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGasStationNetworksProps {
  achievementId: bigint
}

export default function OnchainAchievementGasStationNetworks({ achievementId }: OnchainAchievementGasStationNetworksProps) {
  const { address } = useAccount()
  const [gasStationAddress, setGasStationAddress] = useState('0xgasstation')
  const [sponsorAddress, setSponsorAddress] = useState('0xsponsor')
  const [gasPaid, setGasPaid] = useState('0.001')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordGasStation = () => {
    if (!address) return
    if (!gasStationAddress.trim()) return
    if (!gasStationAddress.startsWith('0x') || gasStationAddress.length !== 42) return

    const payload = `GAS_STATION_NETWORKS|station:${gasStationAddress}|sponsor:${sponsorAddress}|gasPaid:${gasPaid}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⛽ Gas Station Networks</h3>
      <p className="text-sm text-gray-600 mb-4">Record gas station network operations for sponsored transactions.</p>

      <div className="space-y-3 mb-4">
        <input value={gasStationAddress} onChange={(e) => setGasStationAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="Gas station address" />
        <input value={sponsorAddress} onChange={(e) => setSponsorAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Sponsor address" />
        <input value={gasPaid} onChange={(e) => setGasPaid(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Gas paid" />
      </div>

      <button
        onClick={recordGasStation}
        disabled={isPending || isConfirming || !address || !gasStationAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record gas station'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Gas station network operation recorded onchain.
        </div>
      )}
    </section>
  )
}
