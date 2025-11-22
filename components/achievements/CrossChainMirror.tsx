'use client'

import { useMemo, useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'
import type { Post } from '@/types'

interface CrossChainMirrorProps {
  posts?: Post[]
}

const networks = [
  { id: 'base', label: 'Base', accent: 'bg-blue-100 text-blue-800' },
  { id: 'optimism', label: 'Optimism', accent: 'bg-red-100 text-red-800' },
  { id: 'arbitrum', label: 'Arbitrum', accent: 'bg-indigo-100 text-indigo-800' },
]

export default function CrossChainMirror({ posts = [] }: CrossChainMirrorProps) {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0].id)

  const mirroredPosts = useMemo(() => posts.slice(0, 3).map((post, index) => ({
    ...post,
    network: networks[index % networks.length].label,
    txHash: `0x${post.id.toString().padStart(6, '0')}${selectedNetwork.slice(0, 4)}`,
  })), [posts, selectedNetwork])

  return (
    <AppCard
      title="Cross-Chain Mirror"
      subtitle="Preview how your achievements render on other L2s before bridging."
      accent="default"
      padding="dense"
    >
      <div className="flex flex-wrap gap-2 pb-4">
        {networks.map((network) => (
          <button
            key={network.id}
            type="button"
            onClick={() => setSelectedNetwork(network.id)}
            className={`rounded-full border px-4 py-1 text-sm font-medium ${
              selectedNetwork === network.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600'
            }`}
          >
            {network.label}
          </button>
        ))}
      </div>
      {mirroredPosts.length === 0 ? (
        <EmptyState
          icon="🛰️"
          title="No achievements to mirror"
          description="Mint or load onchain proofs to preview across Base, Optimism, and Arbitrum."
          compact
        />
      ) : (
        <div className="space-y-3">
          {mirroredPosts.map((post) => (
            <div key={`${post.id}-${selectedNetwork}`} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2">{post.content}</p>
                <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">{selectedNetwork}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{new Date(Number(post.timestamp) * 1000).toLocaleString()}</p>
              <p className="mt-2 font-mono text-xs text-gray-500 break-all">{post.author}</p>
              <p className="text-xs text-gray-400">mirrored tx: {post.txHash}</p>
            </div>
          ))}
        </div>
      )}
    </AppCard>
  )
}



