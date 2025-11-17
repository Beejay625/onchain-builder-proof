'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementSupportTicket() {
  const [ticket, setTicket] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎫 Support Ticket</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Describe your issue..."
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Submit Ticket
        </button>
      </div>
    </div>
  )
}

