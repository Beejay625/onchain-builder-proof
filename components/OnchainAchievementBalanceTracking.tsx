'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBalanceTrackingProps {
  achievementId: bigint
}

export default function OnchainAchievementBalanceTracking({ achievementId }: OnchainAchievementBalanceTrackingProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [account, setAccount] = useState('0xaccount')
  const [value, setValue] = useState('1000')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!tokenAddress.trim()) return
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) return
    const payload = `BalanceTracking|token:${tokenAddress}|account:${account}|value:${value}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">BalanceTracking</h3>
      <p className="text-sm text-gray-600 mb-4">Track BalanceTracking operations and token states.</p>
      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token address" />
        <input value={account} onChange={(e) => setAccount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Account address" />
        <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Value" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')} className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record BalanceTracking'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">✓ BalanceTracking recorded onchain.</div>}
    </section>
  )
}
