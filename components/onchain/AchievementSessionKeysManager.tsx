'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface SessionKeyPayload {
  key: string
  expiresAt: string
  scopes: string
}

export default function AchievementSessionKeysManager() {
  const { address, isConnected } = useAccount()
  const [payload, setPayload] = useState<SessionKeyPayload>({
    key: '',
    expiresAt: '',
    scopes: 'mint,bridge',
  })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementSessionKeysManager')) {
    return null
  }

  const handleProvision = async () => {
    if (!isConnected || !address || !payload.key.trim()) return

    try {
      const content = `Session Key Provisioned\nKey: ${payload.key}\nExpires: ${payload.expiresAt || 'session'}\nScopes: ${payload.scopes}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Session key provision failed:', error)
    }
  }

  return (
    <AppCard title="🔑 Session Keys Manager" subtitle="Provision account-abstraction session keys with scopes" accent="amber">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Key</label>
          <input
            type="text"
            value={payload.key}
            onChange={(e) => setPayload((prev) => ({ ...prev, key: e.target.value }))}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expires At</label>
            <input
              type="datetime-local"
              value={payload.expiresAt}
              onChange={(e) => setPayload((prev) => ({ ...prev, expiresAt: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scopes</label>
            <input
              type="text"
              value={payload.scopes}
              onChange={(e) => setPayload((prev) => ({ ...prev, scopes: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleProvision}
          disabled={isPending || isConfirming || !isConnected || !payload.key.trim()}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Provisioning...' : 'Provision Session Key'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Session key recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

