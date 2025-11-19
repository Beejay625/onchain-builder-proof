'use client'

import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementSmartContract() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Smart Contract</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Contract Address</p>
          <p className="text-sm font-mono text-gray-900 break-all">{BUILDER_PROOF_CONTRACT}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700">Network</p>
          <p className="text-sm text-gray-900">Base Chain</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700">Status</p>
          <p className="text-sm text-green-600 font-semibold">✓ Verified</p>
        </div>
        
        <div className="flex gap-2 mt-4">
          <a
            href={`https://basescan.org/address/${BUILDER_PROOF_CONTRACT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            View on BaseScan
          </a>
          <a
            href={`https://basescan.org/address/${BUILDER_PROOF_CONTRACT}#code`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
          >
            View Source Code
          </a>
        </div>
      </div>
    </div>
  )
}

