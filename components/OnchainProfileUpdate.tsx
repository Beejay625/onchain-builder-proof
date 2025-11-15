'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function OnchainProfileUpdate() {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const updateProfile = async () => {
    if (!username.trim()) {
      alert('Username is required')
      return
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'updateProfile',
        args: [username, bio, avatar],
      })
    } catch (error) {
      console.error('Profile update error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✏️ Update Profile Onchain</h3>
      
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Avatar URL</label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={updateProfile}
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Updating...' : 'Update Profile Onchain'}
        </button>

        {isSuccess && (
          <div className="p-3 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Profile updated onchain!
          </div>
        )}
      </div>
    </div>
  )
}
