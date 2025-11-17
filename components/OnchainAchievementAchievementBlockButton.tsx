'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementBlockButton() {
  const { address } = useAccount()
  const [blockAddress, setBlockAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const blockUser = async () => {
    if (!address || !blockAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`BLOCK: ${blockAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚫 Block Button</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Address to block"
          value={blockAddress}
          onChange={(e) => setBlockAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={blockUser}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Blocking...' : 'Block User'}
        </button>
        {isSuccess && <p className="text-green-600">User blocked onchain!</p>}
      </div>
    </div>
  )
}

