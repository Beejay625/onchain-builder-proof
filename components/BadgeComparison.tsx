'use client'

import { useState } from 'react'

interface BadgeComparisonProps {
  badge1: { name: string; rarity: string; supply: number }
  badge2: { name: string; rarity: string; supply: number }
}

export default function BadgeComparison({ badge1, badge2 }: BadgeComparisonProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Badge Comparison</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-bold mb-3">{badge1.name}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Rarity:</span>
              <span className="font-semibold">{badge1.rarity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Supply:</span>
              <span className="font-semibold">{badge1.supply}</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-bold mb-3">{badge2.name}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Rarity:</span>
              <span className="font-semibold">{badge2.rarity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Supply:</span>
              <span className="font-semibold">{badge2.supply}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
