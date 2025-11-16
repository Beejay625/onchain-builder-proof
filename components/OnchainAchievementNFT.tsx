'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementNFT() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintNFT = async () => {
    if (!address || !postId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), 'NFT: Minting achievement NFT'],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🖼️ Achievement NFT</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID to mint"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={mintNFT}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint NFT'}
        </button>
        {isSuccess && <p className="text-green-600">NFT minted onchain!</p>}
      </div>
    </div>
  )
}
