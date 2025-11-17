'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementContactPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📧 Contact Page</h2>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Send Message
        </button>
      </div>
    </div>
  )
}

