'use client'

import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function OnchainFilters() {
  const [dateRange, setDateRange] = useState<'all' | 'week' | 'month' | 'year'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')
  const [filterType, setFilterType] = useState<'all' | 'my' | 'others'>('all')

  if (!isFeatureEnabled('onchainFilters')) {
    return null
  }

  return (
    <AppCard title="🔽 Onchain Filters" subtitle="Filter and sort achievements" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as 'all' | 'week' | 'month' | 'year')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'my' | 'others')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="all">All Achievements</option>
            <option value="my">My Achievements</option>
            <option value="others">Others' Achievements</option>
          </select>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Active Filters</p>
          <p className="text-xs">
            Date: {dateRange} | Sort: {sortBy} | Type: {filterType}
          </p>
        </div>
      </div>
    </AppCard>
  )
}

