'use client'

import { useAccount } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementSmartContracts() {
  const { address } = useAccount()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Smart Contracts</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Contract Address:</p>
        <p className="text-xs font-mono text-gray-500 break-all">{BUILDER_PROOF_CONTRACT}</p>
        <p className="text-sm text-gray-500 mt-4">
          All achievements stored on verified smart contract
        </p>
      </div>
    </div>
  )
}

