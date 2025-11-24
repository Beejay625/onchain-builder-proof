'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContinuousPaymentsProps {
  achievementId: bigint
}

export default function OnchainAchievementContinuousPayments({ achievementId }: OnchainAchievementContinuousPaymentsProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [amount, setAmount] = useState('100')
  const [rate, setRate] = useState('10/day')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim() || !contractAddress.startsWith('0x')) return
    const payload = `ContinuousPayments|contract:${contractAddress}|amount:${amount}|rate:${rate}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">ContinuousPayments</h3>
      <p className="text-sm text-gray-600 mb-4">Track ContinuousPayments operations and payment configurations.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={rate} onChange={(e) => setRate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Rate" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record ContinuousPayments'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">✓ ContinuousPayments recorded onchain.</div>}
    </section>
  )
}
