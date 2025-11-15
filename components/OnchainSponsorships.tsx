'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainSponsorshipsProps {
  achievementId: bigint
  recipientAddress: `0x${string}`
}

export default function OnchainSponsorships({ achievementId, recipientAddress }: OnchainSponsorshipsProps) {
  const { address } = useAccount()
  const [sponsorAmount, setSponsorAmount] = useState('')
  
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const sponsorAchievement = async () => {
    if (!address || !sponsorAmount) return
    
    const amount = parseEther(sponsorAmount)
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `SPONSORSHIP: ${sponsorAmount} ETH to ${recipientAddress}`],
      value: amount,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Onchain Sponsorships</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Your Balance</div>
        <div className="font-semibold">{balance ? formatEther(balance.value) : '0'} ETH</div>
      </div>
      
      <input
        type="number"
        value={sponsorAmount}
        onChange={(e) => setSponsorAmount(e.target.value)}
        placeholder="Sponsorship amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={sponsorAchievement}
        disabled={isPending || isConfirming || !sponsorAmount || parseFloat(sponsorAmount) <= 0}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Processing...' : `Sponsor ${sponsorAmount || '0'} ETH`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Sponsorship recorded onchain
        </div>
      )}
    </div>
  )
}

