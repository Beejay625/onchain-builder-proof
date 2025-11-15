'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { formatEthAmount } from '@/lib/utils'

interface Listing {
  id: string
  postId: string
  price: bigint
  seller: string
}

export default function OnchainAchievementMarketplace() {
  const { address } = useAccount()
  const [listings, setListings] = useState<Listing[]>([])
  const [selectedPost, setSelectedPost] = useState('')
  const [price, setPrice] = useState('')
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })

  const listAchievement = () => {
    if (!selectedPost || !price) return
    const listing: Listing = {
      id: Date.now().toString(),
      postId: selectedPost,
      price: BigInt(parseFloat(price) * 1e18),
      seller: address || '',
    }
    setListings([...listings, listing])
    setSelectedPost('')
    setPrice('')
  }

  const posts = userPosts ? Array.from(userPosts as bigint[]) : []

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏪 Achievement Marketplace</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Achievement</label>
          <select
            value={selectedPost}
            onChange={(e) => setSelectedPost(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Choose an achievement</option>
            {posts.map((postId) => (
              <option key={postId.toString()} value={postId.toString()}>
                Achievement #{postId.toString()}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={listAchievement}
          className="w-full px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700"
        >
          List Achievement
        </button>
        {listings.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Your Listings</h3>
            {listings.map((listing) => (
              <div key={listing.id} className="p-3 bg-gray-50 rounded">
                <p>Post #{listing.postId} - {formatEthAmount(listing.price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

