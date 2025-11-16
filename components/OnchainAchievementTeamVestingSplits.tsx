'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTeamVestingSplits() {
  const { address } = useAccount()
  const [splitPercentage, setSplitPercentage] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const configureSplit = async () => {
    if (!address || !splitPercentage) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`VESTING_SPLIT: ${splitPercentage}%`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Team Vesting Splits</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Split percentage"
          value={splitPercentage}
          onChange={(e) => setSplitPercentage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={configureSplit}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Configuring...' : 'Configure Split'}
        </button>
        {isSuccess && <p className="text-green-600">Split configured onchain!</p>}
      </div>
    </div>
  )
}

