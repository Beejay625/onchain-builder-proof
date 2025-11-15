'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainVestingProps {
  achievementId: bigint
}

export default function OnchainVesting({ achievementId }: OnchainVestingProps) {
  const { address } = useAccount()
  const [vestingAmount, setVestingAmount] = useState('')
  const [vestingPeriod, setVestingPeriod] = useState('12')
  const [cliffPeriod, setCliffPeriod] = useState('3')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setupVesting = async () => {
    if (!address || !vestingAmount) return
    
    const vestingData = `VESTING: ${vestingAmount} tokens over ${vestingPeriod} months, ${cliffPeriod} month cliff`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, vestingData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Onchain Vesting</h3>
      
      <input
        type="number"
        value={vestingAmount}
        onChange={(e) => setVestingAmount(e.target.value)}
        placeholder="Vesting amount"
        step="0.01"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={vestingPeriod}
          onChange={(e) => setVestingPeriod(e.target.value)}
          placeholder="Vesting period (months)"
          min="1"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          value={cliffPeriod}
          onChange={(e) => setCliffPeriod(e.target.value)}
          placeholder="Cliff (months)"
          min="0"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>
      
      <button
        onClick={setupVesting}
        disabled={isPending || isConfirming || !vestingAmount}
        className="w-full px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting up...' : 'Setup Vesting Schedule'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Vesting schedule created onchain
        </div>
      )}
    </div>
  )
}

