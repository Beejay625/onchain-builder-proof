'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface ProfileEditorProps {
  currentUsername?: string
  currentBio?: string
  onClose: () => void
}

export default function ProfileEditor({ currentUsername, currentBio, onClose }: ProfileEditorProps) {
  const [username, setUsername] = useState(currentUsername || '')
  const [bio, setBio] = useState(currentBio || '')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleSave = async () => {
    if (!username.trim()) {
      alert('Username is required')
      return
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'updateProfile',
        args: [username, bio],
      })
    } catch (error) {
      console.error('Profile update error:', error)
    }
  }

  if (isSuccess) {
    setTimeout(() => onClose(), 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full p-2 border border-gray-300 rounded-lg"
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">{bio.length}/200 characters</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPending ? 'Saving...' : 'Save Profile'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>

        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  )
}
