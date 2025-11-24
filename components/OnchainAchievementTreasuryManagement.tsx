'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTreasuryManagementProps {
  achievementId: bigint
}

export default function OnchainAchievementTreasuryManagement({ achievementId }: OnchainAchievementTreasuryManagementProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [amount, setAmount] = useState('1000')
  const [recipient, setRecipient] = useState('0xrecipient')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim() || !contractAddress.startsWith('0x')) return
    const payload = `TreasuryManagement|contract:${contractAddress}|amount:${amount}|recipient:${recipient}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">TreasuryManagement</h3>
      <p className="text-sm text-gray-600 mb-4">Track TreasuryManagement operations and distributions.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Recipient" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record TreasuryManagement'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-pink-700 bg-pink-50 border border-pink-200 rounded-lg p-3">✓ TreasuryManagement recorded onchain.</div>}
    </section>
  )
}
