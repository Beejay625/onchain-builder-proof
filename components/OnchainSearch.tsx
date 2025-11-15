'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function OnchainSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const { data: totalPosts } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  const searchOnchain = async () => {
    if (!searchQuery.trim()) return

    try {
      // Search achievements on blockchain
      // This would query contract events or use an indexer
      setSearchResults([])
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔍 Search Onchain</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchOnchain()}
          placeholder="Search achievements..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={searchOnchain}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Found {searchResults.length} results</p>
          {searchResults.map((result) => (
            <div key={result.id} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">{result.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
