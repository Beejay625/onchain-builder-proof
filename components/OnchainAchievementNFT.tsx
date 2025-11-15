'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementNFT() {
  const { address } = useAccount()
  const [achievement, setAchievement] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintAchievementNFT = async () => {
    if (!address || !achievement) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`NFT Achievement: ${achievement}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🖼️ Mint Achievement NFT</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Describe your achievement to mint as NFT"
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-24"
        />
        <button
          onClick={mintAchievementNFT}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint as NFT'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement NFT minted onchain!</p>}
      </div>
    </div>
  )
}

