'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBlockProductionProps {
  achievementId: bigint
}

export default function OnchainAchievementBlockProduction({ achievementId }: OnchainAchievementBlockProductionProps) {
  const { address } = useAccount()
  const [validatorAddress, setValidatorAddress] = useState('0xvalidator')
  const [amount, setAmount] = useState('1000')
  const [data, setData] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!validatorAddress.trim() || !validatorAddress.startsWith('0x')) return
    const payload = `BlockProduction|validator:${validatorAddress}|amount:${amount}|data:${data}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">BlockProduction</h3>
      <p className="text-sm text-gray-600 mb-4">Track BlockProduction operations in blockchain networks.</p>
      <div className="space-y-3 mb-4">
        <input value={validatorAddress} onChange={(e) => setValidatorAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Validator address" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !validatorAddress.startsWith('0x')} className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record BlockProduction'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">✓ BlockProduction recorded onchain.</div>}
    </section>
  )
}
