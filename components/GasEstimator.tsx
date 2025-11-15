'use client'

import { useState, useEffect } from 'react'
import { formatEthAmount } from '@/lib/utils'

export default function GasEstimator() {
  const [gasPrice, setGasPrice] = useState<bigint>(BigInt(0))
  const [estimatedCost, setEstimatedCost] = useState<bigint>(BigInt(0))

  useEffect(() => {
    // Simulate gas price (in a real app, fetch from provider)
    const mockGasPrice = BigInt(1000000000) // 1 gwei
    const mockGasLimit = BigInt(100000)
    setGasPrice(mockGasPrice)
    setEstimatedCost(mockGasPrice * mockGasLimit)
  }, [])

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-gray-700">⛽ Estimated Gas:</span>
        <span className="font-semibold text-blue-700">
          {estimatedCost > 0 ? formatEthAmount(estimatedCost) : 'Calculating...'}
        </span>
      </div>
    </div>
  )
}
