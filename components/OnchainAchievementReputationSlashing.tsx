'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationSlashing() {
  const { address, isConnected } = useAccount()
  const [targetAddress, setTargetAddress] = useState('')
  const [slashAmount, setSlashAmount] = useState('')
  const [reason, setReason] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleSlash = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'slashReputation',
        args: [targetAddress as `0x${string}`, BigInt(slashAmount), reason],
      })
    } catch (error) {
      console.error('Error slashing reputation:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⚔️ Reputation Slashing</h3>
        <p className="text-gray-600">Connect wallet to slash reputation</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⚔️ Reputation Slashing</h3>
      <p className="text-gray-600 mb-4">
        Slash reputation for misbehavior or violations onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Target Address</label>
          <input
            type="text"
            value={targetAddress}
            onChange={(e) => setTargetAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Slash Amount</label>
          <input
            type="number"
            value={slashAmount}
            onChange={(e) => setSlashAmount(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter slash reason"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSlash}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Slashing...' : '⚔️ Slash Reputation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation slashed successfully
          </div>
        )}
      </div>
    </div>
  )
}
