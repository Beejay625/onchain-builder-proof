'use client'

import { useState } from 'react'

export default function MarketplaceSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    // Search marketplace listings
    setSearchResults([])
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔍 Search Marketplace</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search badges..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSearch}
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
              <div className="font-semibold text-sm">{result.name}</div>
              <div className="text-xs text-gray-500">{result.collection}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
