'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAuctionContractsProps {
  achievementId: bigint
}

export default function OnchainAchievementAuctionContracts({ achievementId }: OnchainAchievementAuctionContractsProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [amount, setAmount] = useState('1000')
  const [participants, setParticipants] = useState('2')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!contractAddress.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return
    const payload = `AuctionContracts|contract:${contractAddress}|amount:${amount}|participants:${participants}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">AuctionContracts</h3>
      <p className="text-sm text-gray-600 mb-4">Track AuctionContracts operations and configurations.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input type="number" value={participants} onChange={(e) => setParticipants(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Participants" min="1" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record AuctionContracts'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">✓ AuctionContracts recorded onchain.</div>}
    </section>
  )
}
