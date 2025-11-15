'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainBountiesProps {
  achievementId: bigint
}

export default function OnchainBounties({ achievementId }: OnchainBountiesProps) {
  const { address } = useAccount()
  const [bountyAmount, setBountyAmount] = useState('')
  const [bountyDescription, setBountyDescription] = useState('')
  
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createBounty = async () => {
    if (!address || !bountyAmount || !bountyDescription.trim()) return
    
    const amount = parseEther(bountyAmount)
    const bountyText = `BOUNTY: ${bountyAmount} ETH - ${bountyDescription}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, bountyText],
      value: amount,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Onchain Bounties</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Available Balance</div>
        <div className="font-semibold">{balance ? formatEther(balance.value) : '0'} ETH</div>
      </div>
      
      <input
        type="number"
        value={bountyAmount}
        onChange={(e) => setBountyAmount(e.target.value)}
        placeholder="Bounty amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={bountyDescription}
        onChange={(e) => setBountyDescription(e.target.value)}
        placeholder="Describe the bounty..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={createBounty}
        disabled={isPending || isConfirming || !bountyAmount || !bountyDescription.trim()}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : `Create ${bountyAmount || '0'} ETH Bounty`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Bounty created onchain
        </div>
      )}
    </div>
  )
}

