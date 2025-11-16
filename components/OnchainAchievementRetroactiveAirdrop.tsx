'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRetroactiveAirdrop() {
  const { address } = useAccount()
  const [snapshotBlock, setSnapshotBlock] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const claimAirdrop = async () => {
    if (!address || !snapshotBlock) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `AIRDROP: Claim from block ${snapshotBlock}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Retroactive Airdrop</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Snapshot block"
          value={snapshotBlock}
          onChange={(e) => setSnapshotBlock(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={claimAirdrop}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Claiming...' : 'Claim Airdrop'}
        </button>
        {isSuccess && <p className="text-green-600">Airdrop claimed onchain!</p>}
      </div>
    </div>
  )
}

