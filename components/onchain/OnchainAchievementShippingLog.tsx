'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementShippingLogProps {
  achievementId: bigint
}

export default function OnchainAchievementShippingLog({ achievementId }: OnchainAchievementShippingLogProps) {
  const { address, isConnected } = useAccount()
  const [shippingArea, setShippingArea] = useState('')
  const [shippingItem, setShippingItem] = useState('')
  const [shippingProof, setShippingProof] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !shippingArea.trim() || !shippingItem.trim()) return

    try {
      const payload = `SHIPPING_LOG:area:${shippingArea}:item:${shippingItem}:proof:${shippingProof || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('📦 Shipping Log submission failed:', error)
    }
  }

  return (
    <AppCard title="📦 Shipping Log" subtitle="Document what shipped in each drop" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
          <input
            type="text"
            value={shippingArea}
            onChange={(e) => setShippingArea(e.target.value)}
            placeholder="Smart contracts"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">What Shipped *</label>
          <input
            type="text"
            value={shippingItem}
            onChange={(e) => setShippingItem(e.target.value)}
            placeholder="New withdrawal flow"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Link (optional)</label>
          <input
            type="text"
            value={shippingProof}
            onChange={(e) => setShippingProof(e.target.value)}
            placeholder="Commit / tx"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !shippingArea.trim() || !shippingItem.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging Shipment' : 'Log Shipment'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Shipping log captured
          </div>
        )}
      </div>
    </AppCard>
  )
}
