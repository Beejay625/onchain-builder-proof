'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationPerpetuals() {
  const { address, isConnected } = useAccount()
  const [positionSize, setPositionSize] = useState('')
  const [leverage, setLeverage] = useState('2')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleOpenPosition = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'openPerpetualPosition',
        args: [BigInt(positionSize), BigInt(leverage)],
      })
    } catch (error) {
      console.error('Error opening position:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">∞ Perpetuals</h3>
        <p className="text-gray-600">Connect wallet to trade</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">∞ Reputation Perpetuals</h3>
      <p className="text-gray-600 mb-4">
        Trade perpetual contracts for reputation tokens onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Position Size</label>
          <input
            type="number"
            value={positionSize}
            onChange={(e) => setPositionSize(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Leverage</label>
          <input
            type="number"
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            min="1"
            max="10"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleOpenPosition}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Opening...' : '∞ Open Position'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Perpetual position opened successfully
          </div>
        )}
      </div>
    </div>
  )
}
