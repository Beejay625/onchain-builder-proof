'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRewards() {
  const { address } = useAccount()
  const [rewardType, setRewardType] = useState('')
  const [amount, setAmount] = useState('')
  
  const { data: profile } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getProfile',
    args: address ? [address] : undefined,
  })
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const claimReward = async () => {
    if (!address || !rewardType || !amount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Reward Claimed: ${rewardType} - Amount: ${amount}`],
    })
  }

  const reputation = profile ? Number(profile.reputation) : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Achievement Rewards</h2>
      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-gray-600">Available Rewards</p>
        <p className="text-2xl font-bold">{reputation} points</p>
      </div>
      <div className="space-y-4">
        <select
          value={rewardType}
          onChange={(e) => setRewardType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select reward type</option>
          <option value="reputation">Reputation Boost</option>
          <option value="badge">Special Badge</option>
          <option value="nft">NFT Mint</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={claimReward}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Claiming...' : 'Claim Reward'}
        </button>
        {isSuccess && <p className="text-green-600">Reward claimed onchain!</p>}
      </div>
    </div>
  )
}

