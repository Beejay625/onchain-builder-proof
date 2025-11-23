'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementStablecoinProps {
  achievementId: bigint
}

export default function OnchainAchievementStablecoin({ achievementId }: OnchainAchievementStablecoinProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [data, setData] = useState('')
  const [txHash, setTxHash] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!tokenAddress.trim()) return
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) return
    const payload = `Stablecoin|token:${tokenAddress}|data:${data}|tx:${txHash}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">Stablecoin</h3>
      <p className="text-sm text-gray-600 mb-4">Track Stablecoin operations in DeFi protocols.</p>
      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token address" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')} className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record Stablecoin'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">✓ Stablecoin operation recorded.</div>}
    </section>
  )
}
