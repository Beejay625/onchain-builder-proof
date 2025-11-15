'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface InsurancePolicy {
  id: string
  badgeName: string
  coverage: bigint
  premium: bigint
  duration: number
  active: boolean
}

export default function BadgeInsurance() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([])

  const purchaseInsurance = (policyId: string) => {
    // Purchase insurance policy
    console.log('Purchasing insurance:', policyId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🛡️ Badge Insurance</h2>
      
      <div className="space-y-4">
        {policies.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No insurance policies available</p>
        ) : (
          policies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{policy.badgeName}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  policy.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {policy.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Coverage</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatEthAmount(policy.coverage)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Premium</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatEthAmount(policy.premium)}
                  </div>
                </div>
              </div>
              {!policy.active && (
                <button
                  onClick={() => purchaseInsurance(policy.id)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Purchase Insurance
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
