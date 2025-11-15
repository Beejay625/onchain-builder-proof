'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseUnits, formatEthAmount } from 'viem'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function OnchainTreasury() {
  const [contributionAmount, setContributionAmount] = useState('0.01')

  const { data: treasuryBalance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTreasuryBalance',
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const contribute = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'contributeToTreasury',
        value: parseUnits(contributionAmount, 18),
      })
    } catch (error) {
      console.error('Contribution error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏦 Treasury</h3>
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Total Balance</div>
          <div className="text-3xl font-bold text-green-600">
            {treasuryBalance ? formatEthAmount(treasuryBalance) : '0 ETH'}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Contribution Amount (ETH)</label>
          <input
            type="number"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            step="0.001"
            min="0.001"
          />
        </div>
        <button
          onClick={contribute}
          disabled={isPending}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending ? 'Contributing...' : 'Contribute to Treasury'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Contribution recorded onchain
          </div>
        )}
      </div>
    </div>
  )
}