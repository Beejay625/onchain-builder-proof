'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'
import { useState } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function ProfileCard() {
  const { address } = useAccount()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')

  // Fetch user profile from blockchain
  const { data: profile } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getProfile',
    args: address ? [address] : undefined,
  })

  const { writeContract, isPending } = useWriteContract()

  const handleSaveProfile = async () => {
    if (!name.trim()) return
    
    // Write profile to blockchain
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'updateProfile',
      args: [name, bio, avatar],
    })
    setIsEditing(false)
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {profile?.name ? profile.name.slice(0, 2).toUpperCase() : address?.slice(2, 4).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-lg">{profile?.name || 'Anonymous Builder'}</h3>
            <p className="text-sm text-gray-600">{truncateAddress(address)}</p>
          </div>
        </div>
        {profile?.verified && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            ✓ Verified Onchain
          </span>
        )}
      </div>

      {profile?.bio && !isEditing && (
        <p className="text-gray-700 mb-4">{profile.bio}</p>
      )}

      <div className="flex gap-4 text-sm mb-4">
        <div className="flex flex-col">
          <span className="font-bold text-2xl text-purple-600">{profile?.reputation?.toString() || '0'}</span>
          <span className="text-gray-500">Reputation</span>
        </div>
        <div className="h-12 w-px bg-gray-300"></div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">📍 Base Chain</span>
          <span className="text-xs text-gray-500">⛓️ Onchain Identity</span>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm"
          />
          <textarea
            placeholder="Bio (stored onchain)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveProfile}
              disabled={isPending}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:bg-gray-400"
            >
              {isPending ? 'Saving Onchain...' : 'Save Onchain'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
        >
          Edit Profile Onchain
        </button>
      )}
    </div>
  )
}

