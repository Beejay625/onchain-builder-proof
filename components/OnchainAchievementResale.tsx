'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementResaleProps {
  achievementId: bigint
}

export default function OnchainAchievementResale({ achievementId }: OnchainAchievementResaleProps) {
  const { address } = useAccount()
  const [resalePrice, setResalePrice] = useState('')
  const [marketplace, setMarketplace] = useState('opensea')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const listForResale = async () => {
    if (!address || !resalePrice.trim()) return
    
    const resaleData = `RESALE: ${resalePrice} ETH | marketplace: ${marketplace}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, resaleData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Resale Listing</h3>
      
      <input
        type="number"
        value={resalePrice}
        onChange={(e) => setResalePrice(e.target.value)}
        placeholder="Resale price (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={marketplace}
        onChange={(e) => setMarketplace(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="opensea">OpenSea</option>
        <option value="blur">Blur</option>
        <option value="looksrare">LooksRare</option>
        <option value="custom">Custom</option>
      </select>
      
      <button
        onClick={listForResale}
        disabled={isPending || isConfirming || !resalePrice.trim()}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Listing...' : 'List for Resale Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Resale listing recorded onchain
        </div>
      )}
    </div>
  )
}
