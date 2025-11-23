'use client'

import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function OnchainSorting() {
  const [sortField, setSortField] = useState<'timestamp' | 'likes' | 'comments' | 'author'>('timestamp')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  if (!isFeatureEnabled('onchainSorting')) {
    return null
  }

  return (
    <AppCard title="🔄 Onchain Sorting" subtitle="Sort achievements by various criteria" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort Field</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as 'timestamp' | 'likes' | 'comments' | 'author')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="timestamp">Timestamp</option>
            <option value="likes">Likes</option>
            <option value="comments">Comments</option>
            <option value="author">Author</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Current Sort</p>
          <p className="text-xs">
            Sorting by {sortField} ({sortOrder === 'desc' ? 'newest/highest first' : 'oldest/lowest first'})
          </p>
        </div>
      </div>
    </AppCard>
  )
}

