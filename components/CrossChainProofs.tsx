'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function CrossChainProofs() {
  const [achievementId, setAchievementId] = useState('')
  const [targetChain, setTargetChain] = useState('arbitrum')
  const [proofData, setProofData] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const createCrossChainProof = async () => {
    if (!achievementId.trim() || !proofData.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createCrossChainProof',
        args: [BigInt(achievementId), targetChain, proofData],
      })
    } catch (error) {
      console.error('Cross-chain proof error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌉 Cross-Chain Proof</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Achievement ID</label>
          <input
            type="text"
            value={achievementId}
            onChange={(e) => setAchievementId(e.target.value)}
            placeholder="123"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Target Chain</label>
          <select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
            <option value="polygon">Polygon</option>
            <option value="ethereum">Ethereum</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Proof Data</label>
          <textarea
            value={proofData}
            onChange={(e) => setProofData(e.target.value)}
            placeholder="Proof data..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
        <button
          onClick={createCrossChainProof}
          disabled={isPending}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending ? 'Creating...' : 'Create Cross-Chain Proof'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Cross-chain proof created
          </div>
        )}
      </div>
    </div>
  )
}
