'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRoyaltyDistributionProps {
  achievementId: bigint
}

export default function OnchainAchievementRoyaltyDistribution({ achievementId }: OnchainAchievementRoyaltyDistributionProps) {
  const { address } = useAccount()
  const [treasuryAddress, setTreasuryAddress] = useState('0xtreasury')
  const [amount, setAmount] = useState('1000')
  const [recipient, setRecipient] = useState('0xrecipient')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!treasuryAddress.trim() || !treasuryAddress.startsWith('0x')) return
    const payload = `RoyaltyDistribution|treasury:${treasuryAddress}|amount:${amount}|recipient:${recipient}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">RoyaltyDistribution</h3>
      <p className="text-sm text-gray-600 mb-4">Track RoyaltyDistribution operations and distributions.</p>
      <div className="space-y-3 mb-4">
        <input value={treasuryAddress} onChange={(e) => setTreasuryAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Treasury address" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Recipient" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !treasuryAddress.startsWith('0x')} className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record RoyaltyDistribution'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-pink-700 bg-pink-50 border border-pink-200 rounded-lg p-3">✓ RoyaltyDistribution recorded onchain.</div>}
    </section>
  )
}
