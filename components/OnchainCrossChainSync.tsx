'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainCrossChainSyncProps {
  achievementId: bigint
}

export default function OnchainCrossChainSync({ achievementId }: OnchainCrossChainSyncProps) {
  const { address } = useAccount()
  const [targetChain, setTargetChain] = useState('ethereum')
  const [syncHash, setSyncHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const syncCrossChain = async () => {
    if (!address || !syncHash.trim()) return
    
    const syncData = `CROSS_CHAIN_SYNC: ${targetChain} - Hash: ${syncHash}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, syncData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Onchain Achievement Sync</h3>
      
      <select
        value={targetChain}
        onChange={(e) => setTargetChain(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="ethereum">Ethereum</option>
        <option value="arbitrum">Arbitrum</option>
        <option value="optimism">Optimism</option>
        <option value="polygon">Polygon</option>
      </select>
      
      <input
        type="text"
        value={syncHash}
        onChange={(e) => setSyncHash(e.target.value)}
        placeholder="Sync transaction hash"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={syncCrossChain}
        disabled={isPending || isConfirming || !syncHash.trim()}
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Syncing...' : `Sync to ${targetChain}`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Cross-chain sync recorded
        </div>
      )}
    </div>
  )
}

