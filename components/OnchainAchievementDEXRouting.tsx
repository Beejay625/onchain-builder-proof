'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDEXRoutingProps {
  achievementId: bigint
}

export default function OnchainAchievementDEXRouting({ achievementId }: OnchainAchievementDEXRoutingProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [data, setData] = useState('')
  const [value, setValue] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!tokenAddress.trim() || !tokenAddress.startsWith('0x')) return
    const payload = `DEXRouting|token:${tokenAddress}|data:${data}|value:${value}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">DEXRouting</h3>
      <p className="text-sm text-gray-600 mb-4">Track DEXRouting operations in DeFi protocols.</p>
      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token address" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
        <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Value" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')} className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record DEXRouting'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">✓ DEXRouting recorded onchain.</div>}
    </section>
  )
}
