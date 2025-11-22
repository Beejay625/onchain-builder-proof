'use client'

import { useMemo, useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'

interface WebhookRegistration {
  id: string
  provider: 'vercel' | 'netlify' | 'github-actions' | 'other'
  url: string
  secret: string
  createdAt: number
}

const providers = [
  { id: 'vercel', label: 'Vercel' },
  { id: 'netlify', label: 'Netlify' },
  { id: 'github-actions', label: 'GitHub Actions' },
  { id: 'other', label: 'Other / Custom' },
]

export default function CiCdSync() {
  const [provider, setProvider] = useState<WebhookRegistration['provider']>('vercel')
  const [webhookUrl, setWebhookUrl] = useState('https://onchainbuilderproof.com/api/webhooks/deploy')
  const [registrations, setRegistrations] = useState<WebhookRegistration[]>([])

  const generatedSecret = useMemo(() => crypto.randomUUID().replace(/-/g, '').slice(0, 24), [])

  const registerWebhook = () => {
    setRegistrations((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        provider,
        url: webhookUrl,
        secret: generatedSecret,
        createdAt: Date.now(),
      },
    ])
  }

  return (
    <AppCard
      title="CI/CD Deployment Sync"
      subtitle="Register deployment webhooks that auto-log proofs on Base."
      accent="orange"
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Provider</label>
            <select
              value={provider}
              onChange={(event) => setProvider(event.target.value as WebhookRegistration['provider'])}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            >
              {providers.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Webhook URL</label>
            <input
              value={webhookUrl}
              onChange={(event) => setWebhookUrl(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            <p className="mt-1 text-xs text-gray-400">
              Paste this into your provider. We verify commits, deploy URLs, and automatically push to Base.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Signing secret</p>
          <p className="mt-2 font-mono text-sm text-gray-900">{generatedSecret}</p>
          <p className="mt-1 text-xs text-gray-500">
            Store this secret in your CI/CD provider to authenticate deployment payloads.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={registerWebhook}
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            Register
          </button>
        </div>

        {registrations.length === 0 ? (
          <EmptyState
            icon="🚀"
            title="No webhooks yet"
            description="Register your first webhook to log deployments as onchain achievements."
            compact
          />
        ) : (
          <div className="space-y-3">
            {registrations.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-gray-100 bg-white/70 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  {providers.find((p) => p.id === entry.provider)?.label || 'Provider'} ·{' '}
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-gray-500 break-all">{entry.url}</p>
                <p className="mt-1 font-mono text-xs text-gray-500">secret: {entry.secret}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppCard>
  )
}


