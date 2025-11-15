'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function ReputationDelegation() {
  const [delegatee, setDelegatee] = useState('')
  const [amount, setAmount] = useState('100')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const delegateReputation = async () => {
    if (!delegatee.startsWith('0x')) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'delegateReputation',
        args: [delegatee as `0x${string}`, BigInt(amount)],
      })
    } catch (error) {
      console.error('Delegation error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎫 Delegate Reputation</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Delegate To</label>
          <input
            type="text"
            value={delegatee}
            onChange={(e) => setDelegatee(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="1"
          />
        </div>
        <button
          onClick={delegateReputation}
          disabled={isPending}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending ? 'Delegating...' : 'Delegate Reputation'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Reputation delegated successfully
          </div>
        )}
      </div>
    </div>
  )
}
