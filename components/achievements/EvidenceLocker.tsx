'use client'

import { useEffect, useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'

interface EvidenceItem {
  id: string
  label: string
  url: string
  hash?: string
  addedAt: number
}

const STORAGE_KEY = 'obp.evidenceLocker'

export default function EvidenceLocker() {
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  const [hash, setHash] = useState('')
  const [items, setItems] = useState<EvidenceItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (error) {
      console.warn('Unable to load evidence locker', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.warn('Unable to persist evidence', error)
    }
  }, [items])

  const addEvidence = () => {
    if (!label.trim() || !url.trim()) {
      return
    }

    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        label: label.trim(),
        url: url.trim(),
        hash: hash.trim() || undefined,
        addedAt: Date.now(),
      },
      ...prev,
    ])

    setLabel('')
    setUrl('')
    setHash('')
  }

  const removeEvidence = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <AppCard
      title="Achievement Evidence Locker"
      subtitle="Attach hashes, artifacts, and proofs before minting."
      accent="blue"
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Label</label>
            <input
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Base deployment proof"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">URL</label>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://basescan.org/tx/..."
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Hash (optional)</label>
            <input
              value={hash}
              onChange={(event) => setHash(event.target.value)}
              placeholder="0xabc123..."
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm font-mono focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addEvidence}
            disabled={!label.trim() || !url.trim()}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Add Evidence
          </button>
        </div>
        {items.length === 0 ? (
          <EmptyState
            icon="🧾"
            title="No attachments yet"
            description="Pin deployment proofs, dashboards, Figma files, or IPFS hashes here."
            compact
          />
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {item.url}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEvidence(item.id)}
                    className="text-xs font-semibold text-gray-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {item.hash && (
                  <p className="mt-2 font-mono text-xs text-gray-500 break-all">
                    Hash: {item.hash}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  Added {new Date(item.addedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppCard>
  )
}


