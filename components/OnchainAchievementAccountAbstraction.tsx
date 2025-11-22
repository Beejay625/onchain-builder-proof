'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAccountAbstractionProps {
  achievementId: bigint
}

export default function OnchainAchievementAccountAbstraction({ achievementId }: OnchainAchievementAccountAbstractionProps) {
  const { address } = useAccount()
  const [accountAddress, setAccountAddress] = useState('0xaccount')
  const [paymaster, setPaymaster] = useState('0xpaymaster')
  const [entryPoint, setEntryPoint] = useState('0xentrypoint')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordAA = () => {
    if (!address) return
    if (!accountAddress.trim() || !accountAddress.startsWith('0x')) return

    const payload = `ACCOUNT_ABSTRACTION|account:${accountAddress}|paymaster:${paymaster}|entryPoint:${entryPoint}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔮 Account Abstraction</h3>
      <p className="text-sm text-gray-600 mb-4">Record ERC-4337 account abstraction implementations.</p>

      <div className="space-y-3 mb-4">
        <input value={accountAddress} onChange={(e) => setAccountAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="Account address" />
        <input value={paymaster} onChange={(e) => setPaymaster(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Paymaster address" />
        <input value={entryPoint} onChange={(e) => setEntryPoint(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Entry point address" />
      </div>

      <button
        onClick={recordAA}
        disabled={isPending || isConfirming || !address || !accountAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record account abstraction'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Account abstraction configuration recorded.
        </div>
      )}
    </section>
  )
}
