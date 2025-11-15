'use client'

import { useState } from 'react'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

interface TipButtonProps {
  recipientAddress: string
  achievementId?: string
}

export default function TipButton({ recipientAddress, achievementId }: TipButtonProps) {
  const [showTipModal, setShowTipModal] = useState(false)
  const [tipAmount, setTipAmount] = useState('0.001')

  const { sendTransaction, data: hash } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleTip = async () => {
    try {
      sendTransaction({
        to: recipientAddress as `0x${string}`,
        value: parseEther(tipAmount),
      })
      setShowTipModal(false)
    } catch (error) {
      console.error('Tip error:', error)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowTipModal(true)}
        className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm"
      >
        💰 Tip
      </button>

      {showTipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Send Tip</h3>
            <p className="text-sm text-gray-600 mb-4">
              Support this builder with ETH on Base
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount (ETH)</label>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                step="0.001"
                min="0.001"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-2 mt-2">
                <button onClick={() => setTipAmount('0.001')} className="px-2 py-1 bg-gray-100 rounded text-sm">0.001 ETH</button>
                <button onClick={() => setTipAmount('0.005')} className="px-2 py-1 bg-gray-100 rounded text-sm">0.005 ETH</button>
                <button onClick={() => setTipAmount('0.01')} className="px-2 py-1 bg-gray-100 rounded text-sm">0.01 ETH</button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTip}
                disabled={isConfirming}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {isConfirming ? 'Sending...' : 'Send Tip'}
              </button>
              <button
                onClick={() => setShowTipModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
            {isSuccess && (
              <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
                ✓ Tip sent successfully!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

