'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

const moods = ['🚀 Energized', '⚠️ Blocked', '🧠 Reflective', '🌱 Learning']

export default function OnchainAchievementBuilderMoodTracker() {
  const { isConnected } = useAccount()
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [history, setHistory] = useState<{ mood: string; note: string; at: string }[]>([])

  const recordMood = () => {
    if (!isConnected || !selectedMood) return
    setHistory((prev) => [
      { mood: selectedMood, note: notes, at: new Date().toISOString() },
      ...prev,
    ])
    setNotes('')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🧭 Builder Mood Tracker</h2>
      <p className="text-gray-600 mb-4">
        Capture daily sentiment to contextualize onchain proof-of-work.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            className={`border rounded-lg py-2 px-3 text-sm ${
              selectedMood === mood ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={3}
        placeholder="Optional notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={!selectedMood}
      />
      <button
        onClick={recordMood}
        disabled={!isConnected || !selectedMood}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
      >
        {isConnected ? 'Record Sentiment' : 'Connect Wallet to Continue'}
      </button>
      <div className="mt-6 space-y-3">
        {history.map((entry, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">{new Date(entry.at).toLocaleString()}</div>
            <div className="font-semibold">{entry.mood}</div>
            {entry.note && <p className="text-sm text-gray-600 mt-1">{entry.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
