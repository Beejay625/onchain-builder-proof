'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEIP712Props {
  achievementId: bigint
}

export default function OnchainAchievementEIP712({ achievementId }: OnchainAchievementEIP712Props) {
  const { address } = useAccount()
  const [data, setData] = useState('')
  const [txHash, setTxHash] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address || !data.trim()) return
    const payload = `EIP712|data:${data}|tx:${txHash}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">EIP712</h3>
      <p className="text-sm text-gray-600 mb-4">Track EIP712 operations onchain.</p>
      <div className="space-y-3 mb-4">
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record EIP712'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">✓ Recorded onchain.</div>}
    </section>
  )
}
