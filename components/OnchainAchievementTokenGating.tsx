'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTokenGatingProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenGating({ achievementId }: OnchainAchievementTokenGatingProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [minBalance, setMinBalance] = useState('1')
  const [gateType, setGateType] = useState('ERC721')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordGating = () => {
    if (!address) return
    if (!tokenAddress.trim()) return
    if (!minBalance.trim() || isNaN(Number(minBalance))) return
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) return

    const payload = `TOKEN_GATING|token:${tokenAddress}|minBalance:${minBalance}|type:${gateType}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔐 Token Gating</h3>
      <p className="text-sm text-gray-600 mb-4">Record token gating configurations for access control.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500" placeholder="Token address" />
        <input value={minBalance} onChange={(e) => setMinBalance(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Minimum balance" />
        <input value={gateType} onChange={(e) => setGateType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Gate type" />
      </div>

      <button
        onClick={recordGating}
        disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record token gate'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Token gating configuration recorded onchain.
        </div>
      )}
    </section>
  )
}
