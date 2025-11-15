'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

interface BadgeMintingProps {
  badgeContract: string
}

export default function BadgeMinting({ badgeContract }: BadgeMintingProps) {
  const [badgeName, setBadgeName] = useState('')
  const [badgeDescription, setBadgeDescription] = useState('')
  const [badgeImage, setBadgeImage] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintBadge = async () => {
    if (!badgeName.trim()) {
      alert('Badge name is required')
      return
    }

    try {
      writeContract({
        address: badgeContract as `0x${string}`,
        abi: [
          {
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'tokenURI', type: 'string' },
            ],
            name: 'mint',
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'mint',
        args: [badgeContract as `0x${string}`, badgeImage],
      })
    } catch (error) {
      console.error('Minting error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎨 Mint Badge</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Badge Name</label>
          <input
            type="text"
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
            placeholder="Enter badge name"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={badgeDescription}
            onChange={(e) => setBadgeDescription(e.target.value)}
            placeholder="Badge description"
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            value={badgeImage}
            onChange={(e) => setBadgeImage(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={mintBadge}
          disabled={isPending}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending ? 'Minting...' : 'Mint Badge'}
        </button>

        {isSuccess && (
          <div className="p-3 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Badge minted successfully!
          </div>
        )}
      </div>
    </div>
  )
}
