'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSoulboundTokens() {
  const { address } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintSoulbound = async () => {
    if (!address || !achievementId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(achievementId), `SOULBOUND: Non-transferable token minted`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Soulbound Tokens</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={achievementId}
          onChange={(e) => setAchievementId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={mintSoulbound}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint Soulbound Token'}
        </button>
        {isSuccess && <p className="text-green-600">Soulbound token minted!</p>}
      </div>
    </div>
  )
}

