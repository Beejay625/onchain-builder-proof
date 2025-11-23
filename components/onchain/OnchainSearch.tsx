'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function OnchainSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'content' | 'author' | 'id'>('content')
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  if (!isFeatureEnabled('onchainSearch')) {
    return null
  }

  return (
    <AppCard title="🔍 Onchain Search" subtitle="Search achievements onchain" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Type</label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'content' | 'author' | 'id')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="content">Content</option>
            <option value="author">Author</option>
            <option value="id">ID</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Query</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search by ${searchType}...`}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Search Results</p>
          <p className="text-xs">
            Searching through {totalPosts?.toString() || '0'} onchain achievements...
          </p>
        </div>
      </div>
    </AppCard>
  )
}

