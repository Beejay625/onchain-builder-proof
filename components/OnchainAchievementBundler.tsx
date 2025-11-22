'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBundlerProps {
  achievementId: bigint
}

export default function OnchainAchievementBundler({ achievementId }: OnchainAchievementBundlerProps) {
  const { address } = useAccount()
  const [address1, setAddress1] = useState('0xaddr1')
  const [address2, setAddress2] = useState('0xaddr2')
  const [data, setData] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!address1.trim() || !address1.startsWith('0x')) return
    const payload = `Bundler|addr1:${address1}|addr2:${address2}|data:${data}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">Bundler</h3>
      <p className="text-sm text-gray-600 mb-4">Track Bundler operations for account abstraction.</p>
      <div className="space-y-3 mb-4">
        <input value={address1} onChange={(e) => setAddress1(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Address 1" />
        <input value={address2} onChange={(e) => setAddress2(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Address 2" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !address1.startsWith('0x')} className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record Bundler'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">✓ Bundler recorded.</div>}
    </section>
  )
}
