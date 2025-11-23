'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function OnchainRestore() {
  const { address, isConnected } = useAccount()
  const [backupId, setBackupId] = useState('')
  const [restoreOptions, setRestoreOptions] = useState<'all' | 'selected'>('all')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainRestore')) {
    return null
  }

  const handleRestore = async () => {
    if (!isConnected || !address || !backupId.trim()) return

    try {
      const content = `Onchain Restore\nBackup ID: ${backupId}\nOptions: ${restoreOptions}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Restore failed:', error)
    }
  }

  return (
    <AppCard title="📥 Onchain Restore" subtitle="Restore achievements from backups" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup ID</label>
          <input
            type="text"
            value={backupId}
            onChange={(e) => setBackupId(e.target.value)}
            placeholder="Backup identifier..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Restore Options</label>
          <select
            value={restoreOptions}
            onChange={(e) => setRestoreOptions(e.target.value as 'all' | 'selected')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="all">Restore All</option>
            <option value="selected">Restore Selected</option>
          </select>
        </div>
        <button
          onClick={handleRestore}
          disabled={isPending || isConfirming || !isConnected || !backupId.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Restoring...' : 'Restore from Backup'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Restore initiated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

