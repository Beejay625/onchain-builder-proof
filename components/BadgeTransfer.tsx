'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'

interface BadgeTransferProps {
  badgeTokenId: string
  badgeContract: string
}

export default function BadgeTransfer({ badgeTokenId, badgeContract }: BadgeTransferProps) {
  const [recipient, setRecipient] = useState('')
  const [showTransferModal, setShowTransferModal] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleTransfer = async () => {
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
      console.error('Transfer error:', error)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowTransferModal(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
      >
        🔄 Transfer Badge
      </button>

      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Transfer Badge</h3>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient address (0x...)"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleTransfer}
                disabled={isPending}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
              >
                {isPending ? 'Transferring...' : 'Transfer'}
              </button>
              <button
                onClick={() => setShowTransferModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
            {isSuccess && (
              <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
                ✓ Badge transferred successfully!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
