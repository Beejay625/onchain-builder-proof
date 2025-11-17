'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementMuteButton() {
  const { address } = useAccount()
  const [muteAddress, setMuteAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const muteUser = async () => {
    if (!address || !muteAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`MUTE: ${muteAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔇 Mute Button</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Address to mute"
          value={muteAddress}
          onChange={(e) => setMuteAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={muteUser}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Muting...' : 'Mute User'}
        </button>
        {isSuccess && <p className="text-green-600">User muted onchain!</p>}
      </div>
    </div>
  )
}

