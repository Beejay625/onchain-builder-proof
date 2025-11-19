'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSettings() {
  const { address } = useAccount()
  const [autoSave, setAutoSave] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const saveSettings = async () => {
    if (!address) return
    
    const settingsData = `SETTINGS: autoSave=${autoSave}, email=${emailNotifications}, public=${publicProfile}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [settingsData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚙️ Settings</h3>
      
      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="text-gray-700">Auto-save drafts</span>
        </label>
        
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="text-gray-700">Email notifications</span>
        </label>
        
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={publicProfile}
            onChange={(e) => setPublicProfile(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="text-gray-700">Public profile</span>
        </label>
      </div>
      
      <button
        onClick={saveSettings}
        disabled={isPending || isConfirming}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Saving...' : 'Save Settings Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Settings saved onchain
        </div>
      )}
    </div>
  )
}
