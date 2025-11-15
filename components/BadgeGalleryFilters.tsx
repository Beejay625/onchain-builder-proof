'use client'

import { useState } from 'react'

interface BadgeGalleryFiltersProps {
  onFilterChange: (filters: any) => void
}

export default function BadgeGalleryFilters({ onFilterChange }: BadgeGalleryFiltersProps) {
  const [filters, setFilters] = useState({
    rarity: 'all',
    collection: 'all',
    chain: 'all',
    sortBy: 'newest',
  })

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔍 Filter Badges</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rarity</label>
          <select
            value={filters.rarity}
            onChange={(e) => updateFilter('rarity', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Rarities</option>
            <option value="legendary">Legendary</option>
            <option value="epic">Epic</option>
            <option value="rare">Rare</option>
            <option value="common">Common</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Collection</label>
          <select
            value={filters.collection}
            onChange={(e) => updateFilter('collection', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Collections</option>
            <option value="builder">Builder Badges</option>
            <option value="achievement">Achievement Badges</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Chain</label>
          <select
            value={filters.chain}
            onChange={(e) => updateFilter('chain', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Chains</option>
            <option value="base">Base</option>
            <option value="ethereum">Ethereum</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rarity">Rarity</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
    </div>
  )
}
