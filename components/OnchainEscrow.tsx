'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainEscrowProps {
  achievementId: bigint
}

export default function OnchainEscrow({ achievementId }: OnchainEscrowProps) {
  const { address } = useAccount()
  const [escrowAmount, setEscrowAmount] = useState('')
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('')
  
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createEscrow = async () => {
    if (!address || !escrowAmount || !beneficiaryAddress.trim()) return
    
    const amount = parseEther(escrowAmount)
    const escrowData = `ESCROW: ${escrowAmount} ETH for ${beneficiaryAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, escrowData],
      value: amount,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔒 Onchain Escrow</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Your Balance</div>
        <div className="font-semibold">{balance ? formatEther(balance.value) : '0'} ETH</div>
      </div>
      
      <input
        type="text"
        value={beneficiaryAddress}
        onChange={(e) => setBeneficiaryAddress(e.target.value)}
        placeholder="Beneficiary address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <input
        type="number"
        value={escrowAmount}
        onChange={(e) => setEscrowAmount(e.target.value)}
        placeholder="Escrow amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createEscrow}
        disabled={isPending || isConfirming || !escrowAmount || !beneficiaryAddress.trim()}
        className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : `Create ${escrowAmount || '0'} ETH Escrow`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Escrow created onchain
        </div>
      )}
    </div>
  )
}

