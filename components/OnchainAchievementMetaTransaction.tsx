'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMetaTransactionProps {
  achievementId: bigint
}

export default function OnchainAchievementMetaTransaction({ achievementId }: OnchainAchievementMetaTransactionProps) {
  const { address } = useAccount()
  const [userAddress, setUserAddress] = useState('0xuser')
  const [functionData, setFunctionData] = useState('0xdata')
  const [relayer, setRelayer] = useState('0xrelayer')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordMetaTx = () => {
    if (!address || !userAddress.trim()) return
    if (!userAddress.startsWith('0x') || !relayer.startsWith('0x')) return

    const payload = `META_TX|user:${userAddress}|data:${functionData}|relayer:${relayer}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-teal-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📨 Meta Transaction</h3>
      <p className="text-sm text-gray-600 mb-4">Record gasless meta-transaction executions.</p>

      <div className="space-y-3 mb-4">
        <input value={userAddress} onChange={(e) => setUserAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="User address" />
        <input value={functionData} onChange={(e) => setFunctionData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Function data" />
        <input value={relayer} onChange={(e) => setRelayer(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Relayer address" />
      </div>

      <button
        onClick={recordMetaTx}
        disabled={isPending || isConfirming || !userAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record meta transaction'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">
          ✓ Meta transaction recorded onchain.
        </div>
      )}
    </section>
  )
}
