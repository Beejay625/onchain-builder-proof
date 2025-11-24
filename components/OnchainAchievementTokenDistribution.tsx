'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTokenDistributionProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenDistribution({ achievementId }: OnchainAchievementTokenDistributionProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [amount, setAmount] = useState('10000')
  const [recipients, setRecipients] = useState('100')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim() || !contractAddress.startsWith('0x')) return
    const payload = `TokenDistribution|contract:${contractAddress}|amount:${amount}|recipients:${recipients}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">TokenDistribution</h3>
      <p className="text-sm text-gray-600 mb-4">Track TokenDistribution operations and distributions.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={recipients} onChange={(e) => setRecipients(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Recipients" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record TokenDistribution'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">✓ TokenDistribution recorded onchain.</div>}
    </section>
  )
}
