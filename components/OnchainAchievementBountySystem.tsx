'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBountySystem() {
  const { address } = useAccount()
  const [bountyAmount, setBountyAmount] = useState('')
  const [description, setDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createBounty = async () => {
    if (!address || !bountyAmount || !description) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `BOUNTY: ${bountyAmount} ETH - ${description}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Bounty System</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Bounty amount (ETH)"
          value={bountyAmount}
          onChange={(e) => setBountyAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Bounty description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
        <button
          onClick={createBounty}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Bounty'}
        </button>
        {isSuccess && <p className="text-green-600">Bounty created onchain!</p>}
      </div>
    </div>
  )
}

