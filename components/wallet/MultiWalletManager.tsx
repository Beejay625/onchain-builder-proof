'use client'

import { useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'
import { useAppState } from '@/context'

export default function MultiWalletManager() {
  const { linkedWallets, addLinkedWallet, removeLinkedWallet, setPrimaryWallet, primaryWallet } = useAppState()
  const [walletAddress, setWalletAddress] = useState('')
  const [label, setLabel] = useState('')

  const addWallet = () => {
    if (!walletAddress.trim()) return
    addLinkedWallet({
      address: walletAddress as `0x${string}`,
      label: label.trim() || undefined,
      connectedAt: Date.now(),
    })
    setWalletAddress('')
    setLabel('')
  }

  return (
    <AppCard title="Multi-Wallet Aggregator" subtitle="Aggregate stats across multiple wallets and chains." accent="purple">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Wallet address</label>
          <input
            value={walletAddress}
            onChange={(event) => setWalletAddress(event.target.value)}
            placeholder="0x..."
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm font-mono focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Label</label>
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="Team treasury"
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={addWallet}
          disabled={!walletAddress.trim()}
          className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Add wallet
        </button>
      </div>

      {linkedWallets.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon="🧬"
            title="Single wallet mode"
            description="Add more wallets to compare streaks, impact, and payouts."
            compact
          />
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {linkedWallets.map((wallet) => (
            <div key={wallet.address} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-sm text-gray-900 break-all">{wallet.address}</p>
                  <p className="text-xs text-gray-500">
                    {wallet.label || 'Unlabeled'} · connected {new Date(wallet.connectedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPrimaryWallet(wallet.address)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      primaryWallet === wallet.address
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-gray-200 text-gray-700 hover:border-purple-200'
                    }`}
                  >
                    {primaryWallet === wallet.address ? 'Primary' : 'Make primary'}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeLinkedWallet(wallet.address)}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 hover:border-red-300 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppCard>
  )
}






