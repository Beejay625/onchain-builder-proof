'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementFairLaunch() {
  const { address } = useAccount()
  const [snapshotBlock, setSnapshotBlock] = useState('')
  const [maxWinners, setMaxWinners] = useState('100')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const scheduleFairLaunch = () => {
    if (!address || !snapshotBlock) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`FAIR_LAUNCH:${snapshotBlock}:${maxWinners}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚖️ Fair Launch Scheduler</h2>
      <p className="text-gray-600 mb-4">
        Declare snapshot blocks and participant caps for transparent releases.
      </p>
      <input
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Snapshot block"
        value={snapshotBlock}
        onChange={(e) => setSnapshotBlock(e.target.value)}
      />
      <input
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="Max winners"
        type="number"
        min="1"
        value={maxWinners}
        onChange={(e) => setMaxWinners(e.target.value)}
      />
      <button
        onClick={scheduleFairLaunch}
        disabled={isPending || isConfirming}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending || isConfirming ? 'Scheduling...' : 'Schedule Fair Launch'}
      </button>
      {isSuccess && <p className="text-green-600 mt-4">Fair launch parameters saved.</p>}
    </div>
  )
}
