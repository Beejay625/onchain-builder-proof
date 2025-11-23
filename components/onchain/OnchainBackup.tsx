'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { useState } from 'react'

export default function OnchainBackup() {
  const { address, isConnected } = useAccount()
  const [backupName, setBackupName] = useState('')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainBackup')) {
    return null
  }

  const handleCreateBackup = async () => {
    if (!isConnected || !address) return

    try {
      const backupData = {
        name: backupName || `backup-${Date.now()}`,
        achievements: userPostIds?.map((id) => id.toString()) || [],
        timestamp: Date.now(),
      }
      const content = `Onchain Backup Created\nName: ${backupData.name}\nAchievements: ${backupData.achievements.length}\nTimestamp: ${new Date(backupData.timestamp).toISOString()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Backup creation failed:', error)
    }
  }

  return (
    <AppCard title="💾 Onchain Backup" subtitle="Create backups of onchain data" accent="slate">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            You have {userPostIds?.length || 0} achievement{userPostIds?.length !== 1 ? 's' : ''} to backup
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Name (optional)</label>
          <input
            type="text"
            value={backupName}
            onChange={(e) => setBackupName(e.target.value)}
            placeholder="My Backup"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateBackup}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Backup'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Backup created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

