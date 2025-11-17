'use client'

import { useAccount } from 'wagmi'

export default function OnchainAchievementAchievementGasEstimator() {
  const { address } = useAccount()
  const estimatedGas = '0.001'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⛽ Gas Estimator</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-yellow-600">{estimatedGas}</p>
        <p className="text-gray-600">ETH estimated</p>
        <p className="text-sm text-gray-500 mt-2">
          For next transaction
        </p>
      </div>
    </div>
  )
}

