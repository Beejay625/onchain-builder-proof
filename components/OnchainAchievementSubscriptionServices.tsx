'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSubscriptionServicesProps {
  achievementId: bigint
}

export default function OnchainAchievementSubscriptionServices({ achievementId }: OnchainAchievementSubscriptionServicesProps) {
  const { address } = useAccount()
  const [subscriptionAddress, setSubscriptionAddress] = useState('0xsubscription')
  const [price, setPrice] = useState('10')
  const [period, setPeriod] = useState('30')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordSubscription = () => {
    if (!address) return
    if (!subscriptionAddress.trim()) return
    if (!price.trim() || isNaN(Number(price))) return
    if (!subscriptionAddress.startsWith('0x') || subscriptionAddress.length !== 42) return

    const payload = `SUBSCRIPTION_SERVICES|subscription:${subscriptionAddress}|price:${price}|period:${period}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-sky-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📅 Subscription Services</h3>
      <p className="text-sm text-gray-600 mb-4">Record subscription service configurations and billing cycles.</p>

      <div className="space-y-3 mb-4">
        <input value={subscriptionAddress} onChange={(e) => setSubscriptionAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-500" placeholder="Subscription address" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Price" />
        <input type="number" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Period (days)" min="1" />
      </div>

      <button
        onClick={recordSubscription}
        disabled={isPending || isConfirming || !address || !subscriptionAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record subscription'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-sky-700 bg-sky-50 border border-sky-200 rounded-lg p-3">
          ✓ Subscription service recorded onchain.
        </div>
      )}
    </section>
  )
}
