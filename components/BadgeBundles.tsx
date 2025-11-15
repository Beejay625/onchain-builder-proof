'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface Bundle {
  id: string
  name: string
  badges: string[]
  price: bigint
  discount: number
}

export default function BadgeBundles() {
  const [bundles, setBundles] = useState<Bundle[]>([])

  const purchaseBundle = (bundleId: string) => {
    // Purchase badge bundle
    console.log('Purchasing bundle:', bundleId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Badge Bundles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bundles.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 py-8">
            No bundles available
          </div>
        ) : (
          bundles.map((bundle) => (
            <div key={bundle.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
              <h3 className="font-bold text-lg mb-2">{bundle.name}</h3>
              <div className="text-sm text-gray-600 mb-2">
                {bundle.badges.length} badges included
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xl font-bold text-blue-600">
                  {formatEthAmount(bundle.price)}
                </div>
                {bundle.discount > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    {bundle.discount}% OFF
                  </span>
                )}
              </div>
              <button
                onClick={() => purchaseBundle(bundle.id)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Purchase Bundle
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
