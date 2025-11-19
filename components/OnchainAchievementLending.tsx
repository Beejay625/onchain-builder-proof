'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLendingProps {
  achievementId: bigint
}

export default function OnchainAchievementLending({ achievementId }: OnchainAchievementLendingProps) {
  const { address } = useAccount()
  const [borrowerAddress, setBorrowerAddress] = useState('')
  const [lendingDuration, setLendingDuration] = useState('')
  const [collateralAmount, setCollateralAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const lendAchievement = async () => {
    if (!address || !borrowerAddress.trim() || !lendingDuration.trim()) return
    
    const lendingData = `LENDING: borrower: ${borrowerAddress} | duration: ${lendingDuration} days${collateralAmount ? ` | collateral: ${collateralAmount} ETH` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, lendingData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📚 Lending</h3>
      
      <input
        type="text"
        value={borrowerAddress}
        onChange={(e) => setBorrowerAddress(e.target.value)}
        placeholder="Borrower wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <input
        type="number"
        value={lendingDuration}
        onChange={(e) => setLendingDuration(e.target.value)}
        placeholder="Lending duration (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={collateralAmount}
        onChange={(e) => setCollateralAmount(e.target.value)}
        placeholder="Collateral amount (ETH, optional)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={lendAchievement}
        disabled={isPending || isConfirming || !borrowerAddress.trim() || !lendingDuration.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Lending...' : 'Lend Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Lending agreement recorded onchain
        </div>
      )}
    </div>
  )
}
