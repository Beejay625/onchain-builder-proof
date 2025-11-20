'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function OnchainAchievementAIInsights() {
  const { address, isConnected } = useAccount()
  const [context, setContext] = useState('')
  const [insights, setInsights] = useState<string[]>([])

  const generateInsights = () => {
    if (!isConnected) return
    const phrases = context.split(/\s+/).filter(Boolean)
    const summary = phrases.slice(0, 3).join(' ')
    setInsights([
      `Highlight adoption potential for ${summary || 'this effort'}.`,
      `Flag dependency risks detected for ${address?.slice(0, 6) || 'builder'}.`,
      'Recommend onchain proof links for verifiers.',
    ])
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🤖 AI Insights</h2>
      <p className="text-gray-600 mb-4">
        Draft contextual AI insights to guide onchain reporting.
      </p>
      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={4}
        placeholder="Describe achievement context"
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      <button
        onClick={generateInsights}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
        disabled={!isConnected}
      >
        {isConnected ? 'Generate Insights' : 'Connect Wallet to Continue'}
      </button>
      <div className="mt-6 space-y-3">
        {insights.map((item, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-lg text-sm text-gray-700">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
