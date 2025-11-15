'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatEthAmount } from 'viem'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function AchievementBounty() {
  const [bountyTitle, setBountyTitle] = useState('')
  const [bountyDescription, setBountyDescription] = useState('')
  const [bountyAmount, setBountyAmount] = useState('0.1')
  const [deadline, setDeadline] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const createBounty = async () => {
    if (!bountyTitle.trim() || !bountyDescription.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createBounty',
        args: [bountyTitle, bountyDescription, BigInt(Math.floor(new Date(deadline).getTime() / 1000))],
        value: parseUnits(bountyAmount, 18),
      })
    } catch (error) {
      console.error('Bounty creation error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Create Bounty</h3>
      <div className="space-y-3">
        <input
          type="text"
          value={bountyTitle}
          onChange={(e) => setBountyTitle(e.target.value)}
          placeholder="Bounty title"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <textarea
          value={bountyDescription}
          onChange={(e) => setBountyDescription(e.target.value)}
          placeholder="Bounty description"
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows={3}
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Reward (ETH)</label>
            <input
              type="number"
              value={bountyAmount}
              onChange={(e) => setBountyAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={createBounty}
          disabled={isPending}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending ? 'Creating...' : 'Create Bounty'}
        </button>
        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Bounty created onchain
          </div>
        )}
      </div>
    </div>
  )
}
