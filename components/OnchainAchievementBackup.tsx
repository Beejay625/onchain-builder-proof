'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBackup() {
  const { address } = useAccount()
  const [backupData, setBackupData] = useState<any>(null)
  
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const createBackup = () => {
    if (!userPostIds || userPostIds.length === 0) {
      alert('No achievements to backup')
      return
    }
    
    const backup = {
      address,
      timestamp: Date.now(),
      achievements: userPostIds.map(id => id.toString()),
      version: '1.0.0',
    }
    
    setBackupData(backup)
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `achievement-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💾 Onchain Backup</h3>
      
      <p className="text-gray-600 mb-4">
        Backup all your achievements to a JSON file
      </p>
      
      <button
        onClick={createBackup}
        disabled={!userPostIds || userPostIds.length === 0}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        Create Backup
      </button>

      {backupData && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Backup created with {backupData.achievements.length} achievements
        </div>
      )}
    </div>
  )
}
