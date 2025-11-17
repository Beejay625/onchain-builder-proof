'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementCookieConsent() {
  const [accepted, setAccepted] = useState(false)

  if (accepted) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
      <h2 className="text-2xl font-bold mb-4">🍪 Cookie Consent</h2>
      <p className="text-sm text-gray-600 mb-4">
        We use cookies to improve your experience.
      </p>
      <button
        onClick={() => setAccepted(true)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Accept Cookies
      </button>
    </div>
  )
}

