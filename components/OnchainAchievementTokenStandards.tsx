'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTokenStandardsProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenStandards({ achievementId }: OnchainAchievementTokenStandardsProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [standard, setStandard] = useState('ERC20')
  const [compliance, setCompliance] = useState('compliant')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordStandard = () => {
    if (!address) return
    if (!tokenAddress.trim()) return
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) return

    const payload = `TOKEN_STANDARDS|token:${tokenAddress}|standard:${standard}|compliance:${compliance}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📋 Token Standards</h3>
      <p className="text-sm text-gray-600 mb-4">Record token standard implementations and compliance verification.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="Token address" />
        <input value={standard} onChange={(e) => setStandard(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token standard" />
        <input value={compliance} onChange={(e) => setCompliance(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Compliance status" />
      </div>

      <button
        onClick={recordStandard}
        disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record token standard'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Token standard recorded onchain.
        </div>
      )}
    </section>
  )
}
