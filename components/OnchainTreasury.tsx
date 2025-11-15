'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainTreasuryProps {
  achievementId: bigint
}

export default function OnchainTreasury({ achievementId }: OnchainTreasuryProps) {
  const { address } = useAccount()
  const [treasuryAmount, setTreasuryAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const contributeToTreasury = async () => {
    if (!address || !treasuryAmount) return
    
    const amount = parseEther(treasuryAmount)
    const treasuryData = `TREASURY_CONTRIBUTION: ${treasuryAmount} ETH - ${purpose || 'General fund'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, treasuryData],
      value: amount,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏦 Onchain Treasury</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Your Balance</div>
        <div className="font-semibold">{balance ? formatEther(balance.value) : '0'} ETH</div>
      </div>
      
      <input
        type="number"
        value={treasuryAmount}
        onChange={(e) => setTreasuryAmount(e.target.value)}
        placeholder="Contribution amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        placeholder="Purpose of contribution"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={contributeToTreasury}
        disabled={isPending || isConfirming || !treasuryAmount || parseFloat(treasuryAmount) <= 0}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Contributing...' : `Contribute ${treasuryAmount || '0'} ETH`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Treasury contribution recorded onchain
        </div>
      )}
    </div>
  )
}

