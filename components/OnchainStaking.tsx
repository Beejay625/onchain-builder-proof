'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainStakingProps {
  achievementId: bigint
}

export default function OnchainStaking({ achievementId }: OnchainStakingProps) {
  const { address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakeDuration, setStakeDuration] = useState('30')
  
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const stakeAchievement = async () => {
    if (!address || !stakeAmount) return
    
    const amount = parseEther(stakeAmount)
    const stakeData = `STAKE: ${stakeAmount} ETH for ${stakeDuration} days on achievement #${achievementId}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, stakeData],
      value: amount,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔒 Onchain Staking</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Available Balance</div>
        <div className="font-semibold">{balance ? formatEther(balance.value) : '0'} ETH</div>
      </div>
      
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Stake amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={stakeDuration}
        onChange={(e) => setStakeDuration(e.target.value)}
        placeholder="Duration (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={stakeAchievement}
        disabled={isPending || isConfirming || !stakeAmount || parseFloat(stakeAmount) <= 0}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Staking...' : `Stake ${stakeAmount || '0'} ETH`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Staking recorded onchain
        </div>
      )}
    </div>
  )
}

