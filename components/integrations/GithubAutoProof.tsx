'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'

interface CommitEntry {
  sha: string
  message: string
  author: string
  url: string
  timestamp: string
}

interface GithubResponse {
  commits: CommitEntry[]
}

export default function GithubAutoProof({ onSelect }: { onSelect?: (commit: CommitEntry) => void }) {
  const [repository, setRepository] = useState('talentprotocol/onchain-builder-proof')
  const [token, setToken] = useState('')

  const mutation = useMutation<GithubResponse, Error, { repo: string; token?: string }>({
    mutationFn: async ({ repo, token: authToken }) => {
      const params = new URLSearchParams({ repo })
      if (authToken) {
        params.set('token', authToken)
      }
      const response = await fetch(`/api/github/commits?${params.toString()}`)
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Unable to fetch commits.')
      }
      return response.json()
    },
  })

  const commits = mutation.data?.commits ?? []

  return (
    <AppCard
      title="GitHub Auto-Proof Importer"
      subtitle="Pull recent commits/deployments directly into your drafts."
      accent="green"
      actions={
        <button
          type="button"
          onClick={() => mutation.mutate({ repo: repository, token: token || undefined })}
          className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          {mutation.isPending ? 'Syncing…' : 'Sync Commits'}
        </button>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Repository</label>
            <input
              value={repository}
              onChange={(event) => setRepository(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="owner/repo"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              GitHub token (optional)
            </label>
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="ghp_xxx"
            />
            <p className="mt-1 text-xs text-gray-400">Needed for private repos or higher rate limits.</p>
          </div>
        </div>

        {mutation.isError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
            {mutation.error.message}
          </div>
        )}

        {commits.length === 0 ? (
          <EmptyState
            icon="🌱"
            title="No commits imported yet"
            description="Sync to see the latest 5 commits and convert them into onchain drafts."
            compact
          />
        ) : (
          <div className="space-y-3">
            {commits.map((commit) => (
              <div key={commit.sha} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2">{commit.message}</p>
                  <button
                    type="button"
                    onClick={() => onSelect?.(commit)}
                    className="rounded-full border border-green-200 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-100"
                  >
                    Use as draft
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {commit.author} · {new Date(commit.timestamp).toLocaleString()}
                </p>
                <a href={commit.url} className="text-xs text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                  {commit.sha.slice(0, 7)} ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppCard>
  )
}






