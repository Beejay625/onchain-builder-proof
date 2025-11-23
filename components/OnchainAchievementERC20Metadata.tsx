'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementERC20MetadataProps {
  achievementId: bigint
}

export default function OnchainAchievementERC20Metadata({ achievementId }: OnchainAchievementERC20MetadataProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [data, setData] = useState('')
  const [value, setValue] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!tokenAddress.trim()) return
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) return
    const payload = `ERC20Metadata|token:${tokenAddress}|data:${data}|value:${value}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">ERC20Metadata</h3>
      <p className="text-sm text-gray-600 mb-4">Track ERC20Metadata operations in DeFi protocols.</p>
      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token address" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
        <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Value" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')} className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record ERC20Metadata'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">✓ ERC20Metadata recorded onchain.</div>}
    </section>
  )
}
