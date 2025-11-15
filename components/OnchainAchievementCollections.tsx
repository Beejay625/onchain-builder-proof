'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCollections() {
  const { address } = useAccount()
  const [collectionName, setCollectionName] = useState('')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })

  const togglePost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const createCollection = () => {
    if (!collectionName || selectedPosts.length === 0) return
    // Collection creation logic
    alert(`Collection "${collectionName}" created with ${selectedPosts.length} achievements!`)
  }

  const posts = userPosts ? Array.from(userPosts as bigint[]) : []

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Achievement Collections</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <div className="max-h-60 overflow-y-auto space-y-2">
          {posts.map((postId) => (
            <label key={postId.toString()} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPosts.includes(postId.toString())}
                onChange={() => togglePost(postId.toString())}
              />
              <span>Achievement #{postId.toString()}</span>
            </label>
          ))}
        </div>
        <button
          onClick={createCollection}
          className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
        >
          Create Collection
        </button>
      </div>
    </div>
  )
}

