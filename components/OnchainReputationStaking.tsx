'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { formatNumber } from '@/lib/utils'

export default function OnchainReputationStaking() {
  const { address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  
  const { data: profile } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getProfile',
    args: address ? [address] : undefined,
  })
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const stakeReputation = async () => {
    if (!address || !stakeAmount) return
    // Staking logic would be implemented in contract
  }

  const reputation = profile ? Number(profile.reputation) : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Reputation Staking</h2>
      <div className="mb-4">
        <p className="text-gray-600">Current Reputation: <span className="font-bold">{formatNumber(reputation)}</span></p>
      </div>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Amount to stake"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={stakeReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Staking...' : 'Stake Reputation'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation staked onchain!</p>}
      </div>
    </div>
  )
}

