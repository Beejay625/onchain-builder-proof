'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTokenGating() {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const gateAchievement = async () => {
    if (!address || !tokenAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`GATE: ${tokenAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Token Gating</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Token address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={gateAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Gating...' : 'Gate Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Gated onchain!</p>}
      </div>
    </div>
  )
}

