'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRestore() {
  const { address } = useAccount()
  const [restoreFile, setRestoreFile] = useState<File | null>(null)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setRestoreFile(file)
    }
  }

  const restoreBackup = async () => {
    if (!address || !restoreFile) return
    
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const backup = JSON.parse(event.target?.result as string)
        const restoreData = `RESTORE: ${backup.timestamp} | ${backup.achievements.length} achievements`
        
        writeContract({
          address: BUILDER_PROOF_CONTRACT as `0x${string}`,
          abi: BuilderProofABI,
          functionName: 'createPost',
          args: [restoreData],
        })
      } catch (error) {
        alert('Invalid backup file')
      }
    }
    reader.readAsText(restoreFile)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📥 Restore Backup</h3>
      
      <input
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={restoreBackup}
        disabled={isPending || isConfirming || !restoreFile}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Restoring...' : 'Restore Backup Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Backup restoration initiated onchain
        </div>
      )}
    </div>
  )
}

