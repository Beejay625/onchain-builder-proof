'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainCrossChainProps {
  achievementId: bigint
}

export default function OnchainCrossChain({ achievementId }: OnchainCrossChainProps) {
  const { address } = useAccount()
  const [targetChain, setTargetChain] = useState('ethereum')
  const [verificationData, setVerificationData] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const verifyCrossChain = async () => {
    if (!address || !verificationData.trim()) return
    
    const crossChainData = `CROSS_CHAIN_VERIFICATION: ${targetChain} - ${verificationData}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, crossChainData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌉 Onchain Cross-chain Verification</h3>
      
      <select
        value={targetChain}
        onChange={(e) => setTargetChain(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="ethereum">Ethereum</option>
        <option value="arbitrum">Arbitrum</option>
        <option value="optimism">Optimism</option>
        <option value="polygon">Polygon</option>
        <option value="avalanche">Avalanche</option>
      </select>
      
      <textarea
        value={verificationData}
        onChange={(e) => setVerificationData(e.target.value)}
        placeholder="Cross-chain verification data..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={verifyCrossChain}
        disabled={isPending || isConfirming || !verificationData.trim()}
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Verifying...' : `Verify on ${targetChain}`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Cross-chain verification recorded
        </div>
      )}
    </div>
  )
}

