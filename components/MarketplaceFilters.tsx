'use client'

import { useState } from 'react'

interface MarketplaceFiltersProps {
  onFilterChange: (filters: any) => void
}

export default function MarketplaceFilters({ onFilterChange }: MarketplaceFiltersProps) {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10 },
    rarity: 'all',
    collection: 'all',
    sortBy: 'price_low',
  })

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔍 Marketplace Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range (ETH)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => updateFilter('priceRange', { ...filters.priceRange, min: parseFloat(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => updateFilter('priceRange', { ...filters.priceRange, max: parseFloat(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Max"
            />
          </div>
        </div>

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
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  )
}
