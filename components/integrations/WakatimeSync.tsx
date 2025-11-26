'use client'

import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'
import StatBadge from '@/components/common/StatBadge'

interface Summary {
  range: string
  totalSeconds: number
  dailyAvgSeconds: number
  topLanguages: { name: string; percent: number }[]
}

interface ResponsePayload {
  summary: Summary
  notice?: string
  error?: string
}

const ranges = [
  { id: 'today', label: 'Today' },
  { id: 'last_7_days', label: 'Last 7 days' },
  { id: 'last_30_days', label: 'Last 30 days' },
]

export default function WakatimeSync() {
  const [apiKey, setApiKey] = useState('')
  const [range, setRange] = useState<ResponsePayload['summary']['range']>('last_7_days')

  const mutation = useMutation<ResponsePayload, Error, { apiKey?: string; range: string }>({
    mutationFn: async (payload) => {
      const response = await fetch('/api/wakatime/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Unable to sync Wakatime.')
      }
      return response.json()
    },
  })

  const summary = mutation.data?.summary
  const notice = mutation.data?.notice

  const totalHours = useMemo(() => ((summary?.totalSeconds ?? 0) / 3600).toFixed(1), [summary])
  const avgHours = useMemo(() => ((summary?.dailyAvgSeconds ?? 0) / 3600).toFixed(1), [summary])

  return (
    <AppCard
      title="Wakatime Activity Sync"
      subtitle="Pull focus time into your Builder Proof analytics."
      accent="default"
      actions={
        <button
          type="button"
          onClick={() => mutation.mutate({ apiKey: apiKey || undefined, range })}
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
        >
          {mutation.isPending ? 'Syncing…' : 'Sync Activity'}
        </button>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
              placeholder="waka_xxx"
            />
            <p className="mt-1 text-xs text-gray-400">
              Optional for demo. Without it, we generate simulated productivity data.
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Range</label>
            <select
              value={range}
              onChange={(event) => setRange(event.target.value as typeof range)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
              {ranges.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500">
            <p>
              We never store your key. Requests are proxied directly to Wakatime and discarded after aggregation.
            </p>
          </div>
        </div>

        {mutation.isError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
            {mutation.error.message}
          </div>
        )}

        {notice && (
          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-3 text-sm text-yellow-700">{notice}</div>
        )}

        {!summary ? (
          <EmptyState
            icon="⌚"
            title="No focus time yet"
            description="Sync to see coding hours, averages, and top languages inside your dashboard."
            compact
          />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <StatBadge label="Total Hours" value={`${totalHours}h`} />
              <StatBadge label="Daily Avg" value={`${avgHours}h`} />
              <StatBadge
                label="Top Language"
                value={summary.topLanguages?.[0]?.name ?? '—'}
                delta={{ value: `${summary.topLanguages?.[0]?.percent ?? 0}%`, trend: 'up' }}
              />
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Top languages</p>
              <div className="mt-3 space-y-2">
                {summary.topLanguages?.map((language) => (
                  <div key={language.name} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-32 font-medium">{language.name}</div>
                    <div className="flex-1 rounded-full bg-gray-100">
                      <div
                        className="rounded-full bg-gray-900 py-1 text-right text-xs font-semibold text-white pr-2"
                        style={{ width: `${language.percent}%` }}
                      >
                        {language.percent}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AppCard>
  )
}





