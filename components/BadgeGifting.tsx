'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

interface BadgeGiftingProps {
  badgeTokenId: string
  badgeContract: string
}

export default function BadgeGifting({ badgeTokenId, badgeContract }: BadgeGiftingProps) {
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const giftBadge = async () => {
    if (!recipient || !recipient.startsWith('0x')) {
      alert('Invalid recipient address')
      return
    }

    try {
      writeContract({
        address: badgeContract as `0x${string}`,
        abi: [
          {
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'tokenId', type: 'uint256' },
            ],
            name: 'transferFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'transferFrom',
        args: [recipient as `0x${string}`, BigInt(badgeTokenId)],
      })
    } catch (error) {
      console.error('Gift error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎁 Gift Badge</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message (Optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>

        <button
          onClick={giftBadge}
          disabled={isPending}
          className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending ? 'Gifting...' : 'Gift Badge'}
        </button>

        {isSuccess && (
          <div className="p-3 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Badge gifted successfully!
          </div>
        )}
      </div>
    </div>
  )
}
