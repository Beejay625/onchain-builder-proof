'use client'

import { useState } from 'react'

const currencies = ['USDC', 'DAI', 'ETH', 'BASE']

export default function OnchainAchievementMultiCurrencyTips() {
  const [amount, setAmount] = useState('0.5')
  const [currency, setCurrency] = useState(currencies[0])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">💸 Multi-Currency Tips</h2>
      <p className="text-gray-600 mb-4">Simulate tip allocations across stablecoins and native gas tokens.</p>
      <div className="flex gap-3 mb-4">
        <input
          className="flex-1 border rounded-lg p-2"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="border rounded-lg p-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <p className="text-gray-500 text-sm">Ready to send {amount} {currency} once wallet is connected.</p>
    </div>
  )
}
