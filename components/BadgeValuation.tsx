'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface Valuation {
  badgeName: string
  estimatedValue: bigint
  factors: {
    rarity: number
    demand: number
    historicalPrice: bigint
  }
}

export default function BadgeValuation() {
  const [valuation, setValuation] = useState<Valuation | null>(null)

  const calculateValuation = () => {
    // Calculate badge valuation
    console.log('Calculating valuation')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💎 Valuation</h3>
      
      <button
        onClick={calculateValuation}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Calculate Value
      </button>

      {valuation && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Estimated Value</div>
            <div className="text-3xl font-bold text-blue-600">
              {formatEthAmount(valuation.estimatedValue)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xs text-gray-600 mb-1">Rarity</div>
              <div className="text-lg font-bold">{valuation.factors.rarity}/10</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xs text-gray-600 mb-1">Demand</div>
              <div className="text-lg font-bold">{valuation.factors.demand}/10</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xs text-gray-600 mb-1">Historical</div>
              <div className="text-lg font-bold">{formatEthAmount(valuation.factors.historicalPrice)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
