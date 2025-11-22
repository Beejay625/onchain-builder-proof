'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTokenAllowanceProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenAllowance({ achievementId }: OnchainAchievementTokenAllowanceProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [spender, setSpender] = useState('0xspender')
  const [amount, setAmount] = useState('1000000')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordAllowance = () => {
    if (!address || !tokenAddress.trim()) return
    if (!tokenAddress.startsWith('0x') || !spender.startsWith('0x')) return

    const payload = `TOKEN_ALLOWANCE|token:${tokenAddress}|spender:${spender}|amount:${amount}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-green-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💳 Token Allowance</h3>
      <p className="text-sm text-gray-600 mb-4">Record ERC20 token allowance approvals for integrations.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" placeholder="Token address" />
        <input value={spender} onChange={(e) => setSpender(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" placeholder="Spender address" />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" placeholder="Allowance amount" />
      </div>

      <button
        onClick={recordAllowance}
        disabled={isPending || isConfirming || !tokenAddress.startsWith('0x') || !spender.startsWith('0x')}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record token allowance'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Token allowance recorded onchain.
        </div>
      )}
    </section>
  )
}
