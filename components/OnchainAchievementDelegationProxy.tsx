'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Delegation Proxy
 * Delegate achievement management to another address
 */
export default function OnchainAchievementDelegationProxy() {
  const { address, isConnected } = useAccount()
  const [delegateAddress, setDelegateAddress] = useState('')
  const [expiryTimestamp, setExpiryTimestamp] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleDelegate = async () => {
    if (!isConnected || !address) return
    
    if (!delegateAddress.startsWith('0x') || delegateAddress.length !== 42) {
      alert('Invalid delegate address')
      return
    }

    const expiry = expiryTimestamp 
      ? Math.floor(new Date(expiryTimestamp).getTime() / 1000)
      : BigInt(0)

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'delegateAchievementManagement',
        args: [delegateAddress as `0x${string}`, expiry],
      })
    } catch (error) {
      console.error('Error delegating:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">👤 Delegation Proxy</h3>
        <p className="text-gray-600">Connect wallet to delegate management</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">👤 Onchain Achievement Delegation</h3>
      <p className="text-gray-600 mb-4">
        Delegate achievement management to another address onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Delegate Address</label>
          <input
            type="text"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Expiry (Optional)</label>
          <input
            type="datetime-local"
            value={expiryTimestamp}
            onChange={(e) => setExpiryTimestamp(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleDelegate}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Delegating...' : '👤 Delegate Management'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Delegation set successfully
          </div>
        )}
      </div>
    </div>
  )
}




