'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEscrowProps {
  achievementId: bigint
}

export default function OnchainAchievementEscrow({ achievementId }: OnchainAchievementEscrowProps) {
  const { address } = useAccount()
  const [escrowAmount, setEscrowAmount] = useState('')
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createEscrow = async () => {
    if (!address || !escrowAmount.trim() || !beneficiaryAddress.trim()) return
    
    const escrowData = `ESCROW: ${escrowAmount} ETH | beneficiary: ${beneficiaryAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, escrowData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔒 Escrow Account</h3>
      
      <input
        type="number"
        value={escrowAmount}
        onChange={(e) => setEscrowAmount(e.target.value)}
        placeholder="Escrow amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={beneficiaryAddress}
        onChange={(e) => setBeneficiaryAddress(e.target.value)}
        placeholder="Beneficiary wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={createEscrow}
        disabled={isPending || isConfirming || !escrowAmount.trim() || !beneficiaryAddress.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Escrow Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Escrow account created onchain
        </div>
      )}
    </div>
  )
}
